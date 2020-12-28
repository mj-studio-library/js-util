export default function convertJsonKeys<T extends Record<string, unknown> | any[]>(
  json: T,
  serializedNames: { [P in string]: string },
): any {
  if (!json || (typeof json !== 'object' && !Array.isArray(json))) return json;

  let jsonString = JSON.stringify(json);

  Object.entries(serializedNames).forEach(([original, serialized]) => {
    const regex = new RegExp(`\"${original}\":`, 'g');

    jsonString = jsonString.replace(regex, `\"${serialized}\":`);
  });

  return JSON.parse(jsonString);
}
