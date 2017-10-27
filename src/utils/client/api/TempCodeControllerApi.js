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
import ApiError from '../model/ApiError';
import PublicKeyDTO from '../model/PublicKeyDTO';
import VerificationDTO from '../model/VerificationDTO';

/**
* TempCodeController service.
* @module api/TempCodeControllerApi
* @version 1.0.0
*/
export default class TempCodeControllerApi {

    /**
    * Constructs a new TempCodeControllerApi. 
    * @alias module:api/TempCodeControllerApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * createTempCode
     * @param {String} uuid uuid
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link 'Number'} and HTTP response
     */
    createTempCodeUsingPUTWithHttpInfo(uuid) {
      let postBody = null;

      // verify the required parameter 'uuid' is set
      if (uuid === undefined || uuid === null) {
        throw new Error("Missing the required parameter 'uuid' when calling createTempCodeUsingPUT");
      }


      let pathParams = {
        'uuid': uuid
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = 'Number';

      return this.apiClient.callApi(
        '/api/mobile/tempCode/{uuid}', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * createTempCode
     * @param {String} uuid uuid
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link 'Number'}
     */
    createTempCodeUsingPUT(uuid) {
      return this.createTempCodeUsingPUTWithHttpInfo(uuid)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * uploadPublicKey
     * @param {module:model/PublicKeyDTO} body body
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    uploadPublicKeyUsingPUTWithHttpInfo(body) {
      let postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling uploadPublicKeyUsingPUT");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = null;

      return this.apiClient.callApi(
        '/api/mobile/upload', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * uploadPublicKey
     * @param {module:model/PublicKeyDTO} body body
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    uploadPublicKeyUsingPUT(body) {
      return this.uploadPublicKeyUsingPUTWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * verifyDataSignature
     * @param {module:model/VerificationDTO} body body
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link 'String'} and HTTP response
     */
    verifyDataSignatureUsingPOSTWithHttpInfo(body) {
      let postBody = body;

      // verify the required parameter 'body' is set
      if (body === undefined || body === null) {
        throw new Error("Missing the required parameter 'body' when calling verifyDataSignatureUsingPOST");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = 'String';

      return this.apiClient.callApi(
        '/api/mobile/verify', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * verifyDataSignature
     * @param {module:model/VerificationDTO} body body
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link 'String'}
     */
    verifyDataSignatureUsingPOST(body) {
      return this.verifyDataSignatureUsingPOSTWithHttpInfo(body)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * verifyTempCode
     * @param {Number} tempCode tempCode
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing data of type {@link 'String'} and HTTP response
     */
    verifyTempCodeUsingGETWithHttpInfo(tempCode) {
      let postBody = null;

      // verify the required parameter 'tempCode' is set
      if (tempCode === undefined || tempCode === null) {
        throw new Error("Missing the required parameter 'tempCode' when calling verifyTempCodeUsingGET");
      }


      let pathParams = {
        'tempCode': tempCode
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['*/*'];
      let returnType = 'String';

      return this.apiClient.callApi(
        '/api/tempCode/verify/{tempCode}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * verifyTempCode
     * @param {Number} tempCode tempCode
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with data of type {@link 'String'}
     */
    verifyTempCodeUsingGET(tempCode) {
      return this.verifyTempCodeUsingGETWithHttpInfo(tempCode)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}
