import { describe, it, expect } from 'vitest';
import {
  formatValue,
  formatNumber,
  formatPercentage,
  formatCurrency,
  formatDate,
  getColorBySeuil
} from '../src/utils/formatters.js';

describe('formatters', () => {
  describe('formatNumber', () => {
    it('formate un nombre avec séparateurs de milliers', () => {
      // Le format français utilise l'espace insécable
      expect(formatNumber(1234567)).toMatch(/1\s*234\s*567/);
    });

    it('arrondit les décimales', () => {
      expect(formatNumber(123.456)).toBe('123');
    });
  });

  describe('formatPercentage', () => {
    it('formate un pourcentage', () => {
      const result = formatPercentage(75);
      expect(result).toMatch(/75\s*%/);
    });

    it('gère les décimales', () => {
      const result = formatPercentage(75.5);
      expect(result).toMatch(/75[,.]5\s*%/);
    });
  });

  describe('formatCurrency', () => {
    it('formate une valeur en euros', () => {
      const result = formatCurrency(1500);
      expect(result).toMatch(/1\s*500\s*€/);
    });
  });

  describe('formatValue', () => {
    it('formate selon le type spécifié', () => {
      expect(formatValue(100, 'nombre')).toBe('100');
      expect(formatValue(75, 'pourcentage')).toMatch(/75\s*%/);
    });

    it('retourne "—" pour les valeurs nulles', () => {
      expect(formatValue(null, 'nombre')).toBe('—');
      expect(formatValue(undefined, 'nombre')).toBe('—');
      expect(formatValue('', 'nombre')).toBe('—');
    });

    it('retourne "—" pour les valeurs non numériques', () => {
      expect(formatValue('abc', 'nombre')).toBe('—');
    });
  });

  describe('formatDate', () => {
    it('formate une date en format français', () => {
      const result = formatDate('2025-01-15');
      expect(result).toBe('15/01/2025');
    });

    it('retourne "—" pour une date invalide', () => {
      expect(formatDate('invalid')).toBe('—');
    });
  });

  describe('getColorBySeuil', () => {
    it('retourne vert si au-dessus du seuil vert', () => {
      expect(getColorBySeuil(90, 80, 50)).toBe('vert');
    });

    it('retourne orange si au-dessus du seuil orange mais sous le vert', () => {
      expect(getColorBySeuil(60, 80, 50)).toBe('orange');
    });

    it('retourne rouge si sous tous les seuils', () => {
      expect(getColorBySeuil(30, 80, 50)).toBe('rouge');
    });

    it('retourne bleu si aucun seuil défini', () => {
      expect(getColorBySeuil(50)).toBe('bleu');
    });
  });
});
