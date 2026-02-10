import { describe, it, expect } from 'vitest';
import {
  SKILLS,
  getRelevantSkills,
  buildSkillsContext,
} from '../../../apps/builder-ia/src/skills';
import type { Source } from '../../../apps/builder-ia/src/state';

// Component imports for introspection
import { GouvSource } from '../../../src/components/gouv-source.js';
import { GouvQuery } from '../../../src/components/gouv-query.js';
import { GouvKpi } from '../../../src/components/gouv-kpi.js';
import { GouvDatalist } from '../../../src/components/gouv-datalist.js';
import { GouvDsfrChart } from '../../../src/components/gouv-dsfr-chart.js';
import { GouvNormalize } from '../../../src/components/gouv-normalize.js';
import { GouvFacets } from '../../../src/components/gouv-facets.js';

// Type/constant imports for alignment checks
import type { FilterOperator, AggregateFunction } from '../../../src/components/gouv-query.js';

/**
 * Extract HTML attribute names from a Lit component class via elementProperties.
 * - If attribute option is false → skip (internal property)
 * - If attribute option is a string → use it (explicit mapping)
 * - Otherwise → Lit lowercases the property name
 */
function getHtmlAttributes(ComponentClass: typeof GouvSource): Set<string> {
  const attrs = new Set<string>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props = (ComponentClass as any).elementProperties as Map<string, { attribute?: string | false }> | undefined;
  if (!props) return attrs;

  for (const [propName, options] of props) {
    if (options?.attribute === false) continue; // @state() or internal
    const htmlAttr = typeof options?.attribute === 'string'
      ? options.attribute
      : propName.toLowerCase();
    attrs.add(htmlAttr);
  }
  return attrs;
}

describe('builder-ia skills', () => {
  it('should have 16 skill definitions', () => {
    expect(Object.keys(SKILLS)).toHaveLength(16);
  });

  it('should have expected skill IDs', () => {
    expect(SKILLS).toHaveProperty('createChartAction');
    expect(SKILLS).toHaveProperty('reloadDataAction');
    expect(SKILLS).toHaveProperty('gouvSource');
    expect(SKILLS).toHaveProperty('gouvQuery');
    expect(SKILLS).toHaveProperty('gouvNormalize');
    expect(SKILLS).toHaveProperty('gouvFacets');
    expect(SKILLS).toHaveProperty('gouvKpi');
    expect(SKILLS).toHaveProperty('gouvDsfrChart');
    expect(SKILLS).toHaveProperty('gouvDatalist');
    expect(SKILLS).toHaveProperty('dsfrChartNative');
    expect(SKILLS).toHaveProperty('compositionPatterns');
    expect(SKILLS).toHaveProperty('odsql');
    expect(SKILLS).toHaveProperty('odsApiVersions');
    expect(SKILLS).toHaveProperty('chartTypes');
    expect(SKILLS).toHaveProperty('dsfrColors');
    expect(SKILLS).toHaveProperty('troubleshooting');
  });

  it('each skill should have required properties', () => {
    for (const [key, skill] of Object.entries(SKILLS)) {
      expect(skill.id, `${key} should have id`).toBe(key);
      expect(skill.name, `${key} should have name`).toBeTruthy();
      expect(skill.trigger, `${key} should have triggers`).toBeInstanceOf(Array);
      expect(skill.trigger.length, `${key} should have at least one trigger`).toBeGreaterThan(0);
      expect(skill.content, `${key} should have content`).toBeTruthy();
    }
  });

  describe('getRelevantSkills', () => {
    it('should return empty array for unrelated message', () => {
      const result = getRelevantSkills('bonjour comment ca va', null);
      expect(result).toEqual([]);
    });

    it('should match gouvDsfrChart skill for "graphique" keyword', () => {
      const result = getRelevantSkills('je veux un graphique', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('gouvDsfrChart');
    });

    it('should match dsfrColors skill for "couleur" keyword', () => {
      const result = getRelevantSkills('change la couleur', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('dsfrColors');
    });

    it('should match gouvQuery skill for "filtre" keyword', () => {
      const result = getRelevantSkills('ajoute un filtre', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('gouvQuery');
    });

    it('should match multiple skills for a complex message', () => {
      const result = getRelevantSkills('fais un graphique avec un filtre sur les couleurs', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('gouvDsfrChart');
      expect(ids).toContain('gouvQuery');
      expect(ids).toContain('dsfrColors');
    });

    it('should auto-include odsql skills for API sources', () => {
      const apiSource: Source = { id: '1', name: 'test', type: 'api', url: 'https://example.com' };
      const result = getRelevantSkills('bonjour', apiSource);
      const ids = result.map(s => s.id);
      expect(ids).toContain('odsql');
      expect(ids).toContain('odsApiVersions');
    });

    it('should not duplicate odsql for API source when already triggered', () => {
      const apiSource: Source = { id: '1', name: 'test', type: 'api', url: 'https://example.com' };
      const result = getRelevantSkills('fais une requete api', apiSource);
      const odsqlCount = result.filter(s => s.id === 'odsql').length;
      expect(odsqlCount).toBe(1);
    });

    it('should not auto-include odsql for non-API sources', () => {
      const manualSource: Source = { id: '1', name: 'test', type: 'manual' };
      const result = getRelevantSkills('bonjour', manualSource);
      expect(result).toEqual([]);
    });

    it('should be case-insensitive', () => {
      const result = getRelevantSkills('GRAPHIQUE EN BARRES', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('gouvDsfrChart');
    });

    it('should auto-include gouvQuery for KPI with filtering context', () => {
      const result = getRelevantSkills('kpi prix moyen dans le departement 48', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('gouvQuery');
      expect(ids).toContain('gouvKpi');
    });

    it('should auto-include gouvQuery for chart with region filter', () => {
      const result = getRelevantSkills('graphique barres pour la region IDF', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('gouvQuery');
      expect(ids).toContain('gouvDsfrChart');
    });

    it('should match gouvQuery for "departement" keyword', () => {
      const result = getRelevantSkills('filtre par departement', null);
      const ids = result.map(s => s.id);
      expect(ids).toContain('gouvQuery');
    });
  });

  describe('buildSkillsContext', () => {
    it('should return empty string for no skills', () => {
      expect(buildSkillsContext([])).toBe('');
    });

    it('should include skill content', () => {
      const skills = [SKILLS.dsfrColors];
      const result = buildSkillsContext(skills);
      expect(result).toContain('SKILLS INJECTES');
      expect(result).toContain('Bleu France');
    });

    it('should concatenate multiple skills', () => {
      const skills = [SKILLS.chartTypes, SKILLS.dsfrColors];
      const result = buildSkillsContext(skills);
      expect(result).toContain('Choix du type de graphique');
      expect(result).toContain('Bleu France');
    });
  });

  // =========================================================================
  // Skills ↔ Components alignment tests
  // =========================================================================

  describe('skills-component alignment', () => {

    // Attributes that are standard HTML and not component-specific
    const IGNORED_ATTRS = new Set(['id']);

    /**
     * Check that every HTML attribute of a component is mentioned in the skill content.
     */
    function assertAttributesCovered(
      componentClass: typeof GouvSource,
      skillId: string,
      componentName: string,
    ) {
      const attrs = getHtmlAttributes(componentClass);
      const content = SKILLS[skillId].content;

      for (const attr of attrs) {
        if (IGNORED_ATTRS.has(attr)) continue;
        expect(
          content.includes(attr),
          `Skill "${skillId}" should document attribute "${attr}" from <${componentName}>`
        ).toBe(true);
      }
    }

    describe('attribute coverage', () => {
      it('gouvSource skill covers all <gouv-source> attributes', () => {
        assertAttributesCovered(GouvSource, 'gouvSource', 'gouv-source');
      });

      it('gouvQuery skill covers all <gouv-query> attributes', () => {
        assertAttributesCovered(GouvQuery as unknown as typeof GouvSource, 'gouvQuery', 'gouv-query');
      });

      it('gouvKpi skill covers all <gouv-kpi> attributes', () => {
        assertAttributesCovered(GouvKpi as unknown as typeof GouvSource, 'gouvKpi', 'gouv-kpi');
      });

      it('gouvDatalist skill covers all <gouv-datalist> attributes', () => {
        assertAttributesCovered(GouvDatalist as unknown as typeof GouvSource, 'gouvDatalist', 'gouv-datalist');
      });

      it('gouvNormalize skill covers all <gouv-normalize> attributes', () => {
        assertAttributesCovered(GouvNormalize as unknown as typeof GouvSource, 'gouvNormalize', 'gouv-normalize');
      });

      it('gouvFacets skill covers all <gouv-facets> attributes', () => {
        assertAttributesCovered(GouvFacets as unknown as typeof GouvSource, 'gouvFacets', 'gouv-facets');
      });

      it('gouvDsfrChart skill covers all <gouv-dsfr-chart> attributes', () => {
        assertAttributesCovered(GouvDsfrChart as unknown as typeof GouvSource, 'gouvDsfrChart', 'gouv-dsfr-chart');
      });
    });

    describe('chart types coverage', () => {
      // These must match the DSFRChartType union in gouv-dsfr-chart.ts
      const DSFR_CHART_TYPES = ['line', 'bar', 'pie', 'radar', 'gauge', 'scatter', 'bar-line', 'map', 'map-reg'];

      it('gouvDsfrChart skill mentions all supported chart types', () => {
        const content = SKILLS.gouvDsfrChart.content;
        for (const type of DSFR_CHART_TYPES) {
          expect(
            content.includes(type),
            `Skill "gouvDsfrChart" should mention chart type "${type}"`
          ).toBe(true);
        }
      });

      it('chartTypes skill mentions all supported chart types', () => {
        const content = SKILLS.chartTypes.content;
        for (const type of DSFR_CHART_TYPES) {
          expect(
            content.includes(type),
            `Skill "chartTypes" should mention chart type "${type}"`
          ).toBe(true);
        }
      });
    });

    describe('filter operators coverage', () => {
      // Must match the FilterOperator type in gouv-query.ts
      const FILTER_OPERATORS: FilterOperator[] = [
        'eq', 'neq', 'gt', 'gte', 'lt', 'lte',
        'contains', 'notcontains', 'in', 'notin',
        'isnull', 'isnotnull',
      ];

      it('gouvQuery skill documents all filter operators', () => {
        const content = SKILLS.gouvQuery.content;
        for (const op of FILTER_OPERATORS) {
          expect(
            content.includes(op),
            `Skill "gouvQuery" should document filter operator "${op}"`
          ).toBe(true);
        }
      });
    });

    describe('aggregation functions coverage', () => {
      // Must match the AggregateFunction type in gouv-query.ts
      const AGG_FUNCTIONS: AggregateFunction[] = ['count', 'sum', 'avg', 'min', 'max'];

      it('gouvQuery skill documents all aggregation functions', () => {
        const content = SKILLS.gouvQuery.content;
        for (const fn of AGG_FUNCTIONS) {
          expect(
            content.includes(fn),
            `Skill "gouvQuery" should document aggregation function "${fn}"`
          ).toBe(true);
        }
      });
    });

    describe('exported components coverage', () => {
      // Map of exported component classes to their expected skill ID
      const COMPONENT_SKILL_MAP: Record<string, string> = {
        'GouvSource': 'gouvSource',
        'GouvQuery': 'gouvQuery',
        'GouvNormalize': 'gouvNormalize',
        'GouvFacets': 'gouvFacets',
        'GouvKpi': 'gouvKpi',
        'GouvDatalist': 'gouvDatalist',
        'GouvDsfrChart': 'gouvDsfrChart',
      };

      it('every data component has a corresponding skill', () => {
        for (const [componentName, skillId] of Object.entries(COMPONENT_SKILL_MAP)) {
          expect(
            SKILLS[skillId],
            `Component ${componentName} should have a corresponding skill "${skillId}"`
          ).toBeDefined();
        }
      });
    });

    describe('DSFR palettes coverage', () => {
      const DSFR_PALETTES = [
        'categorical', 'sequentialAscending', 'sequentialDescending',
        'divergentAscending', 'divergentDescending', 'neutral', 'default',
      ];

      it('dsfrColors skill documents all DSFR Chart palettes', () => {
        const content = SKILLS.dsfrColors.content;
        for (const palette of DSFR_PALETTES) {
          expect(
            content.includes(palette),
            `Skill "dsfrColors" should document palette "${palette}"`
          ).toBe(true);
        }
      });

      it('gouvDsfrChart skill documents all DSFR Chart palettes', () => {
        const content = SKILLS.gouvDsfrChart.content;
        for (const palette of DSFR_PALETTES) {
          expect(
            content.includes(palette),
            `Skill "gouvDsfrChart" should document palette "${palette}"`
          ).toBe(true);
        }
      });
    });
  });
});
