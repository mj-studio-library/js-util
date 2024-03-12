import type { JSONCandidate } from './camelCaseObject';
export type ReplaceJsonKeysOptions = {
    stripUndefined?: boolean;
    replaceMap?: Record<string, any>;
    postLeafTransform?: (value: any) => string;
};
export default function replaceJsonKeys(objOrArr: JSONCandidate, options: Partial<Omit<ReplaceJsonKeysOptions, 'keyFilter'>>): JSONCandidate;
