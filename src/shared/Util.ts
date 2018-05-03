import { Map, Seq } from "immutable";

export class Util {
  /**
   * Return a list key lists for all object paths
   * @param {{[p: string]: any}} map
   * @param {string[]} currentPath
   * @returns {string[][]}
   */
  public static getObjectKeyPaths(
    map: { [key: string]: any },
    currentPath: string[] = [],
  ): string[][] {
    const entries = Seq(Object.entries(map));
    return [
      ...entries.map(([k]) => [...currentPath, k]),
      ...entries
        .filter(([_, v]) => typeof v === "object")
        .flatMap(([k]) => this.getObjectKeyPaths(map[k], [...currentPath, k])),
    ].sort();
  }

  /**
   * Return a new object with all keys pointing to empty objects removed
   * @param {{[p: string]: any}} object
   * @returns {{[p: string]: any}}
   */
  public static removeEmptyObjects(object: { [key: string]: any }): { [key: string]: any } {
    const map = Map({ ...object });

    return Seq(this.getObjectKeyPaths(object))
      .map(keyPath => [keyPath, map.getIn(keyPath)])
      .filter(
        ([_, value]) =>
          typeof value !== "object" || (typeof value === "object" && value.length > 0),
      )
      .reduce((carry, [keyPath, value]) => {
        return carry.setIn(keyPath, value);
      }, Map({}))
      .toJS();
  }
}
