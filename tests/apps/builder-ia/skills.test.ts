import { describe, it, expect } from 'vitest';
import {
  SKILLS,
  getRelevantSkills,
  buildSkillsContext,
} from '../../../apps/builder-ia/src/skills';
import type { Source } from '../../../apps/builder-ia/src/state';

describe('builder-ia skills', () => {
  it('should have 12 skill definitions', () => {
    expect(Object.keys(SKILLS)).toHaveLength(12);
  });

  it('should have expected skill IDs', () => {
    expect(SKILLS).toHaveProperty('gouvSource');
    expect(SKILLS).toHaveProperty('gouvQuery');
    expect(SKILLS).toHaveProperty('gouvKpi');
    expect(SKILLS).toHaveProperty('gouvDsfrChart');
    expect(SKILLS).toHaveProperty('gouvDatalist');
    expect(SKILLS).toHaveProperty('dsfrChartNative');
    expect(SKILLS).toHaveProperty('compositionPatterns');
    expect(SKILLS).toHaveProperty('odsql');
    expect(SKILLS).toHaveProperty('odsApiVersions');
    expect(SKILLS).toHaveProperty('chartTypes');
    expect(SKILLS).toHaveProperty('dsfrColors');
    expect(SKILLS).toHaveProperty('apiQuery');
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
  });

  describe('buildSkillsContext', () => {
    it('should return empty string for no skills', () => {
      expect(buildSkillsContext([])).toBe('');
    });

    it('should include skill content', () => {
      const skills = [SKILLS.dsfrColors];
      const result = buildSkillsContext(skills);
      expect(result).toContain('CONNAISSANCES DISPONIBLES');
      expect(result).toContain('Bleu France');
    });

    it('should concatenate multiple skills', () => {
      const skills = [SKILLS.chartTypes, SKILLS.dsfrColors];
      const result = buildSkillsContext(skills);
      expect(result).toContain('Choix du type de graphique');
      expect(result).toContain('Bleu France');
    });
  });
});
