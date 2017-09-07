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
import ChangesDTO from './ChangesDTO';
import Sort from './Sort';





/**
* The PageOfChangesDTO model module.
* @module model/PageOfChangesDTO
* @version 1.0.0
*/
export default class PageOfChangesDTO {
    /**
    * Constructs a new <code>PageOfChangesDTO</code>.
    * @alias module:model/PageOfChangesDTO
    * @class
    */

    constructor() {
        

        
        

        

        
    }

    /**
    * Constructs a <code>PageOfChangesDTO</code> from a plain JavaScript object, optionally creating a new instance.
    * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
    * @param {Object} data The plain JavaScript object bearing properties of interest.
    * @param {module:model/PageOfChangesDTO} obj Optional instance to populate.
    * @return {module:model/PageOfChangesDTO} The populated <code>PageOfChangesDTO</code> instance.
    */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new PageOfChangesDTO();

            
            
            

            if (data.hasOwnProperty('content')) {
                obj['content'] = ApiClient.convertToType(data['content'], [ChangesDTO]);
            }
            if (data.hasOwnProperty('first')) {
                obj['first'] = ApiClient.convertToType(data['first'], 'Boolean');
            }
            if (data.hasOwnProperty('last')) {
                obj['last'] = ApiClient.convertToType(data['last'], 'Boolean');
            }
            if (data.hasOwnProperty('number')) {
                obj['number'] = ApiClient.convertToType(data['number'], 'Number');
            }
            if (data.hasOwnProperty('numberOfElements')) {
                obj['numberOfElements'] = ApiClient.convertToType(data['numberOfElements'], 'Number');
            }
            if (data.hasOwnProperty('size')) {
                obj['size'] = ApiClient.convertToType(data['size'], 'Number');
            }
            if (data.hasOwnProperty('sort')) {
                obj['sort'] = Sort.constructFromObject(data['sort']);
            }
            if (data.hasOwnProperty('totalElements')) {
                obj['totalElements'] = ApiClient.convertToType(data['totalElements'], 'Number');
            }
            if (data.hasOwnProperty('totalPages')) {
                obj['totalPages'] = ApiClient.convertToType(data['totalPages'], 'Number');
            }
        }
        return obj;
    }

    /**
    * @member {Array.<module:model/ChangesDTO>} content
    */
    content = undefined;
    /**
    * @member {Boolean} first
    */
    first = undefined;
    /**
    * @member {Boolean} last
    */
    last = undefined;
    /**
    * @member {Number} number
    */
    number = undefined;
    /**
    * @member {Number} numberOfElements
    */
    numberOfElements = undefined;
    /**
    * @member {Number} size
    */
    size = undefined;
    /**
    * @member {module:model/Sort} sort
    */
    sort = undefined;
    /**
    * @member {Number} totalElements
    */
    totalElements = undefined;
    /**
    * @member {Number} totalPages
    */
    totalPages = undefined;








}


