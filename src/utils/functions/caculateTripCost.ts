export const calculateTripCost = (pricePerKm: number, kilometers: number, tripType: number): number => {
    const multiplier = tripType === 1 ? 1 : 2;
    return pricePerKm * kilometers * multiplier;
  };