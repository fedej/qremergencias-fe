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
* The MedicalRecordChangeDTO model module.
* @module model/MedicalRecordChangeDTO
* @version 1.0.0
*/
export default class MedicalRecordChangeDTO {
    /**
    * Constructs a new <code>MedicalRecordChangeDTO</code>.
    * @alias module:model/MedicalRecordChangeDTO
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>MedicalRecordChangeDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/MedicalRecordChangeDTO} obj Optional instance to populate.
    * @return {module:model/MedicalRecordChangeDTO} The populated <code>MedicalRecordChangeDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MedicalRecordChangeDTO();

            
            
            

            if (data.hasOwnProperty('action')) {
                obj['action'] = ApiClient.convertToType(data['action'], 'String');
            }
            if (data.hasOwnProperty('modifiedBy')) {
                obj['modifiedBy'] = ApiClient.convertToType(data['modifiedBy'], 'String');
            }
            if (data.hasOwnProperty('timestamp')) {
                obj['timestamp'] = ApiClient.convertToType(data['timestamp'], 'Date');
            }
        }
        return obj;
    }

    /**
    * @member {String} action
    */
    action = undefined;
    /**
    * @member {String} modifiedBy
    */
    modifiedBy = undefined;
    /**
    * @member {Date} timestamp
    */
    timestamp = undefined;








}


