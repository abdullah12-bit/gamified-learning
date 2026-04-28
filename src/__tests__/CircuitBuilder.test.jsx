import { describe, expect, it } from 'vitest';
import {
  BUILDER_CIRCUITS,
  getBatteryLabelPosition,
  getBulbLabelPosition,
} from '../screens/CircuitBuilder';

function pointTouchesWire(point, wire) {
  const isVertical = wire.x1 === wire.x2;
  const isHorizontal = wire.y1 === wire.y2;

  if (isVertical && point.x === wire.x1) {
    return point.y >= Math.min(wire.y1, wire.y2) && point.y <= Math.max(wire.y1, wire.y2);
  }

  if (isHorizontal && point.y === wire.y1) {
    return point.x >= Math.min(wire.x1, wire.x2) && point.x <= Math.max(wire.x1, wire.x2);
  }

  return false;
}

describe('CircuitBuilder diagram labels', () => {
  it('keeps simple circuit component labels off the wire path', () => {
    const circuit = BUILDER_CIRCUITS[0];
    const labels = [
      getBatteryLabelPosition(circuit),
      getBulbLabelPosition(circuit.bulb),
    ];

    for (const label of labels) {
      for (const wire of circuit.wires) {
        expect(pointTouchesWire(label, wire)).toBe(false);
      }
    }
  });
});
