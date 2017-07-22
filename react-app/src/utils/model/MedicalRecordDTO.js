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
import MedicalRecordChangeDTO from './MedicalRecordChangeDTO';





/**
* The MedicalRecordDTO model module.
* @module model/MedicalRecordDTO
* @version 1.0.0
*/
export default class MedicalRecordDTO {
    /**
    * Constructs a new <code>MedicalRecordDTO</code>.
    * @alias module:model/MedicalRecordDTO
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>MedicalRecordDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/MedicalRecordDTO} obj Optional instance to populate.
    * @return {module:model/MedicalRecordDTO} The populated <code>MedicalRecordDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new MedicalRecordDTO();

            
            
            

            if (data.hasOwnProperty('changes')) {
                obj['changes'] = ApiClient.convertToType(data['changes'], [MedicalRecordChangeDTO]);
            }
            if (data.hasOwnProperty('files')) {
                obj['files'] = ApiClient.convertToType(data['files'], [Object]);
            }
            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('performed')) {
                obj['performed'] = ApiClient.convertToType(data['performed'], 'Date');
            }
            if (data.hasOwnProperty('text')) {
                obj['text'] = ApiClient.convertToType(data['text'], 'String');
            }
        }
        return obj;
    }

    /**
    * @member {Array.<module:model/MedicalRecordChangeDTO>} changes
    */
    changes = undefined;
    /**
    * @member {Array.<Object>} files
    */
    files = undefined;
    /**
    * @member {String} id
    */
    id = undefined;
    /**
    * @member {String} name
    */
    name = undefined;
    /**
    * @member {Date} performed
    */
    performed = undefined;
    /**
    * @member {String} text
    */
    text = undefined;








}


