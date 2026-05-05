export function validateVariations(type: string, variations: any[]) {
  // Only validate for percentage flags
  if (type !== "percentage") return;

  if (!Array.isArray(variations) || variations.length === 0) {
    throw new Error("Variations are required for percentage flags");
  }

  let totalWeight = 0;

  for (const v of variations) {
    if (v.value === undefined) {
      throw new Error("Each variation must have a value");
    }

    if (typeof v.weight !== "number") {
      throw new Error("Each variation must have a numeric weight");
    }

    totalWeight += v.weight;
  }

  if (totalWeight !== 100) {
    throw new Error("Total variation weights must equal 100");
  }
}