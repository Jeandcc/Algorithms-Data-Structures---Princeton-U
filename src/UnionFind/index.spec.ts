import { baseTestFunction, longTestFunction } from ".";

import QF from "./QuickFind";
import QU from "./QuickUnion";
import WQU from "./WeightedQuickUnion";
import WCQU from "./WeightedCompressedQU";

test("Quick Find for UF works", () => {
  const uf = new QF(10);
  baseTestFunction(uf);
});

test("Quick Union for UF works", () => {
  const uf = new QU(10);
  baseTestFunction(uf);
});

test("Weighted Quick Union for UF works", () => {
  const uf = new WQU(10);
  baseTestFunction(uf);
});

test("Weighted compressed Quick Union for UF works", () => {
  const uf = new WCQU(10);
  baseTestFunction(uf);
});

test("Performance test for Quick Find", () => {
  const uf = new QF(625);
  longTestFunction(uf);
});

test("Performance test for Quick Union", () => {
  const uf = new QU(625);
  longTestFunction(uf);
});

test("Performance test for Weighted Quick Union", () => {
  const uf = new WQU(625);
  longTestFunction(uf);
});

test("Performance test for Weighted Compressed Quick Union", () => {
  const uf = new WCQU(625);
  longTestFunction(uf);
});
