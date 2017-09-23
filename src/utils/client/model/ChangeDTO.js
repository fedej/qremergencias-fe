/**
 * QR Emergencias WS
 * API Rest QR Emergencias
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 */


import ApiClient from '../ApiClient';





/**
* The ChangeDTO model module.
* @module model/ChangeDTO
* @version 1.0.0
*/
export default class ChangeDTO {
    /**
    * Constructs a new <code>ChangeDTO</code>.
    * @alias module:model/ChangeDTO
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>ChangeDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/ChangeDTO} obj Optional instance to populate.
    * @return {module:model/ChangeDTO} The populated <code>ChangeDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ChangeDTO();

            
            
            

            if (data.hasOwnProperty('added')) {
                obj['added'] = ApiClient.convertToType(data['added'], ['String']);
            }
            if (data.hasOwnProperty('newValue')) {
                obj['newValue'] = ApiClient.convertToType(data['newValue'], Object);
            }
            if (data.hasOwnProperty('oldValue')) {
                obj['oldValue'] = ApiClient.convertToType(data['oldValue'], Object);
            }
            if (data.hasOwnProperty('property')) {
                obj['property'] = ApiClient.convertToType(data['property'], 'String');
            }
            if (data.hasOwnProperty('removed')) {
                obj['removed'] = ApiClient.convertToType(data['removed'], ['String']);
            }
        }
        return obj;
    }

    /**
    * @member {Array.<String>} added
    */
    added = undefined;
    /**
    * @member {Object} newValue
    */
    newValue = undefined;
    /**
    * @member {Object} oldValue
    */
    oldValue = undefined;
    /**
    * @member {String} property
    */
    property = undefined;
    /**
    * @member {Array.<String>} removed
    */
    removed = undefined;








}

