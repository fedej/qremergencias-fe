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
import CreateUserDTO from '../model/CreateUserDTO';

/**
* Userfrontcontroller service.
* @module api/UserfrontcontrollerApi
* @version 1.0.0
*/
export default class UserfrontcontrollerApi {

    /**
    * Constructs a new UserfrontcontrollerApi. 
    * @alias module:api/UserfrontcontrollerApi
    * @class
    * @param {module:ApiClient} apiClient Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }



    /**
     * changePassword
     * @param {Object} opts Optional parameters
     * @param {String} opts.id 
     * @param {String} opts.password 
     * @param {String} opts.newPassword 
     * @param {String} opts.confirmPassword 
     * @param {String} opts.recaptchaResponse 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    changePasswordUsingPOSTWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'id': opts['id'],
        'password': opts['password'],
        'newPassword': opts['newPassword'],
        'confirmPassword': opts['confirmPassword'],
        'recaptchaResponse': opts['recaptchaResponse']
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
        '/api/userFront/changePassword', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * changePassword
     * @param {Object} opts Optional parameters
     * @param {String} opts.id 
     * @param {String} opts.password 
     * @param {String} opts.newPassword 
     * @param {String} opts.confirmPassword 
     * @param {String} opts.recaptchaResponse 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    changePasswordUsingPOST(opts) {
      return this.changePasswordUsingPOSTWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * completeRegistration
     * @param {Object} opts Optional parameters
     * @param {String} opts.token 
     * @param {String} opts.lastName 
     * @param {String} opts.name 
     * @param {Date} opts.birthDate 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    completeRegistrationUsingPOSTWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'token': opts['token'],
        'lastName': opts['lastName'],
        'name': opts['name'],
        'birthDate': opts['birthDate']
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
        '/api/userFront/completeRegistration', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * completeRegistration
     * @param {Object} opts Optional parameters
     * @param {String} opts.token 
     * @param {String} opts.lastName 
     * @param {String} opts.name 
     * @param {Date} opts.birthDate 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    completeRegistrationUsingPOST(opts) {
      return this.completeRegistrationUsingPOSTWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * @param {String} username 
     * @param {String} password 
     * @param {Object} opts Optional parameters
     * @param {String} opts.gRecaptchaResponse 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    loginUsingPOSTWithHttpInfo(username, password, opts) {
      opts = opts || {};
      let postBody = null;

      // verify the required parameter 'username' is set
      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling loginUsingPOST");
      }

      // verify the required parameter 'password' is set
      if (password === undefined || password === null) {
        throw new Error("Missing the required parameter 'password' when calling loginUsingPOST");
      }


      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'username': username,
        'password': password,
        'g-recaptcha-response': opts['gRecaptchaResponse']
      };

      let authNames = [];
      let contentTypes = ['application/x-www-form-urlencoded'];
      let accepts = [];
      let returnType = null;

      return this.apiClient.callApi(
        '/api/login', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * @param {String} username 
     * @param {String} password 
     * @param {Object} opts Optional parameters
     * @param {String} opts.gRecaptchaResponse 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    loginUsingPOST(username, password, opts) {
      return this.loginUsingPOSTWithHttpInfo(username, password, opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * register
     * @param {module:model/CreateUserDTO} model model
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    registerUsingPOSTWithHttpInfo(model) {
      let postBody = model;

      // verify the required parameter 'model' is set
      if (model === undefined || model === null) {
        throw new Error("Missing the required parameter 'model' when calling registerUsingPOST");
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
        '/api/userFront/register', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * register
     * @param {module:model/CreateUserDTO} model model
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    registerUsingPOST(model) {
      return this.registerUsingPOSTWithHttpInfo(model)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * resetPassword
     * @param {Object} opts Optional parameters
     * @param {String} opts.token 
     * @param {String} opts.newPassword 
     * @param {String} opts.confirmPassword 
     * @param {String} opts.recaptchaResponse 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    resetPasswordUsingPOSTWithHttpInfo(opts) {
      opts = opts || {};
      let postBody = null;


      let pathParams = {
      };
      let queryParams = {
        'token': opts['token'],
        'newPassword': opts['newPassword'],
        'confirmPassword': opts['confirmPassword'],
        'recaptchaResponse': opts['recaptchaResponse']
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
        '/api/userFront/resetPassword', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * resetPassword
     * @param {Object} opts Optional parameters
     * @param {String} opts.token 
     * @param {String} opts.newPassword 
     * @param {String} opts.confirmPassword 
     * @param {String} opts.recaptchaResponse 
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    resetPasswordUsingPOST(opts) {
      return this.resetPasswordUsingPOSTWithHttpInfo(opts)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


    /**
     * sendForgotPassword
     * @param {String} gRecaptchaResponse g-recaptcha-response
     * @param {String} username username
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}, with an object containing HTTP response
     */
    sendForgotPasswordUsingPOSTWithHttpInfo(gRecaptchaResponse, username) {
      let postBody = null;

      // verify the required parameter 'gRecaptchaResponse' is set
      if (gRecaptchaResponse === undefined || gRecaptchaResponse === null) {
        throw new Error("Missing the required parameter 'gRecaptchaResponse' when calling sendForgotPasswordUsingPOST");
      }

      // verify the required parameter 'username' is set
      if (username === undefined || username === null) {
        throw new Error("Missing the required parameter 'username' when calling sendForgotPasswordUsingPOST");
      }


      let pathParams = {
      };
      let queryParams = {
        'g-recaptcha-response': gRecaptchaResponse,
        'username': username
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
        '/api/userFront/sendForgotPassword', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType
      );
    }

    /**
     * sendForgotPassword
     * @param {String} gRecaptchaResponse g-recaptcha-response
     * @param {String} username username
     * @return {Promise} a {@link https://www.promisejs.org/|Promise}
     */
    sendForgotPasswordUsingPOST(gRecaptchaResponse, username) {
      return this.sendForgotPasswordUsingPOSTWithHttpInfo(gRecaptchaResponse, username)
        .then(function(response_and_data) {
          return response_and_data.data;
        });
    }


}