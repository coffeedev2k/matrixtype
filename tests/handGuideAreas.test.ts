import { describe, expect, it } from 'vitest';
import { handGuideAreas, handGuideViewBox } from '../src/data/handGuideAreas';
import type { FingerHandGuideArea, HandGuideArea, ThumbHandGuideArea } from '../src/data/handGuideAreas';

const viewBoxWidth = handGuideViewBox.width;

describe('hand guide areas', () => {
  it('provides palm, visual thumb, and numbered finger areas for both hands', () => {
    for (const hand of ['left', 'right'] as const) {
      expect(handGuideAreas.some((area) => area.hand === hand && area.kind === 'palm')).toBe(true);
      expect(handGuideAreas.some((area) => area.hand === hand && area.kind === 'thumb')).toBe(true);

      const fingers = handGuideAreas
        .filter((area): area is FingerHandGuideArea => area.hand === hand && area.kind === 'finger')
        .map((area) => area.fingerNumber)
        .sort();

      expect(fingers).toEqual([1, 2, 3, 4]);
    }
  });

  it('keeps left and right guide areas mirrored', () => {
    for (const kind of ['palm', 'thumb'] as const) {
      expectMirrored(getArea('left', kind), getArea('right', kind));
    }

    for (const fingerNumber of [1, 2, 3, 4] as const) {
      expectMirrored(getFinger('left', fingerNumber), getFinger('right', fingerNumber));
    }
  });

  it('maps numbered finger paths to the visual method order', () => {
    expect(fingerNumbersByVisualOrder('left')).toEqual([4, 3, 2, 1]);
    expect(fingerNumbersByVisualOrder('right')).toEqual([1, 2, 3, 4]);
  });

  it('keeps thumb areas below the numbered finger tips', () => {
    const leftThumb = bounds(getArea('left', 'thumb'));
    const rightThumb = bounds(getArea('right', 'thumb'));

    expect(leftThumb.minY).toBeGreaterThan(handGuideViewBox.height * 0.5);
    expect(rightThumb.minY).toBeGreaterThan(handGuideViewBox.height * 0.5);
  });
});

function fingerNumbersByVisualOrder(hand: 'left' | 'right'): number[] {
  return handGuideAreas
    .filter((area): area is FingerHandGuideArea => area.hand === hand && area.kind === 'finger')
    .map((area) => ({
      fingerNumber: area.fingerNumber,
      centerX: (bounds(area).minX + bounds(area).maxX) / 2
    }))
    .sort((left, right) => left.centerX - right.centerX)
    .map((area) => area.fingerNumber);
}

function getArea(hand: 'left' | 'right', kind: 'palm' | 'thumb'): HandGuideArea {
  const area = handGuideAreas.find((item) => item.hand === hand && item.kind === kind);

  expect(area).toBeTruthy();

  return area!;
}

function getFinger(hand: 'left' | 'right', fingerNumber: 1 | 2 | 3 | 4): FingerHandGuideArea {
  const area = handGuideAreas.find(
    (item): item is FingerHandGuideArea =>
      item.hand === hand && item.kind === 'finger' && item.fingerNumber === fingerNumber
  );

  expect(area).toBeTruthy();

  return area!;
}

function expectMirrored(leftArea: HandGuideArea, rightArea: HandGuideArea): void {
  const left = bounds(leftArea);
  const right = bounds(rightArea);

  expect(left.minX).toBeCloseTo(viewBoxWidth - right.maxX, 1);
  expect(left.maxX).toBeCloseTo(viewBoxWidth - right.minX, 1);
  expect(left.minY).toBeCloseTo(right.minY, 1);
  expect(left.maxY).toBeCloseTo(right.maxY, 1);
}

interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

function bounds(area: HandGuideArea | ThumbHandGuideArea): Bounds {
  const numbers = Array.from(area.d.matchAll(/-?\d+(?:\.\d+)?/g)).map((match) => Number(match[0]));
  const points = [];

  for (let index = 0; index < numbers.length - 1; index += 2) {
    points.push({
      x: numbers[index],
      y: numbers[index + 1]
    });
  }

  return {
    minX: Math.min(...points.map((point) => point.x)),
    minY: Math.min(...points.map((point) => point.y)),
    maxX: Math.max(...points.map((point) => point.x)),
    maxY: Math.max(...points.map((point) => point.y))
  };
}
