const getIndexOfFuzzyMatch = function(s, index, tolerance) {
  const start = Math.max(0, index - tolerance);
  const end = Math.min(s.length, index + tolerance);
  for (let i = start; i <= end; i++) {
    const value = s[i];
    if (value == '1') {
      return i;
    }
  }
  return -1;
}

export const compareRhythmsNoDoubleCount =
  function(refRhythm: string, detRhythm: string, tolerance?: number) {
  if (!tolerance) {
    tolerance = 1;
  }
  const ref = refRhythm.split('');
  const det = detRhythm.split('');
  const result = ref.map(char => '?');
  for (let i = 0; i < ref.length; i++) {
    const refBeat = ref[i];
    const detBeat = det[i];
    if (refBeat == '1') {
      const fuzzyIndex = getIndexOfFuzzyMatch(det, i, tolerance);
      if (refBeat == detBeat) {
        // Perfect match.
        result[i] = '✓';
        det[i] = '0';
      } else if (fuzzyIndex > 0) {
        // Imperfect match: a beat falls within the range
        result[i] = '?';
        det[fuzzyIndex] = '0';
      } else {
        // No match: the beat was missed.
        result[i] = 'x';
      }
    } else {
      result[i] = '-';
    }
  }
  return result.join('');
}

export const beatGenerator = async function(rhythmString: string) {

}
