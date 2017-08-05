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


import ApiClient from "../ApiClient";
import PageOfMedicalRecordDTO from '../model/PageOfMedicalRecordDTO';

/**
* Medicalrecordcontroller service.
* @module api/MedicalrecordcontrollerApi
* @version 1.0.0
*/
export default class MedicalrecordcontrollerApi {

    /**
    * Constructs a new MedicalrecordcontrollerApi. 
    * @alias module:api/MedicalrecordcontrollerApi
    * @class
    * @param {module:ApiClient} apiClient Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * list
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page Results page you want to retrieve (0..N)
     * @param {Number} opts.size Number of records per page
     * @param {Array.<String>} opts.sort Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link module:model/PageOfMedicalRecordDTO} and HTTP response
     */
    listUsingGETWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'page': opts['page'],
        'size': opts['size'],
        'sort': this.apiClient.buildCollectionParam(opts['sort'], 'multi')
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = PageOfMedicalRecordDTO;

      return this.apiClient.callApi(
        '/api/medicalRecord', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * list
     * @param {Object} opts Optional parameters
     * @param {Number} opts.page Results page you want to retrieve (0..N)
     * @param {Number} opts.size Number of records per page
     * @param {Array.<String>} opts.sort Sorting criteria in the format: property(,asc|desc). Default sort order is ascending. Multiple sort criteria are supported.
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link module:model/PageOfMedicalRecordDTO}
     */
    listUsingGET(opts) {
      return this.listUsingGETWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}