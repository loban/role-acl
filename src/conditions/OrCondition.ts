import { CommonUtil } from './../utils/common';
import { IConditionFunction } from './IConditionFunction';
import { ConditionUtil } from './index';
import { AccessControlError } from '../core';
import { ArrayUtil } from '../utils/';

/**
 * Or condition
 *
 *  @author Dilip Kola <dilip@tensult.com>
 */
export class OrCondition implements IConditionFunction {

    async evaluate(args?: any, context?: any): Promise<boolean> {
        if (!args) {
            return true;
        }

        if (!context) {
            return false;
        }

        if (CommonUtil.type(args) !== 'array' && CommonUtil.type(args) !== 'object') {
            throw new AccessControlError('OrCondition expects type of args to be array or object')
        }

        const conditions = ArrayUtil.toArray(args);

        let result = false;
        for (let condition of conditions) {
            result = result || await ConditionUtil.evaluate(condition, context);
        }
        return result;
    }
}


