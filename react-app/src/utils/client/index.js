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


import ApiClient from './ApiClient';
import ApiError from './model/ApiError';
import ApiFieldError from './model/ApiFieldError';
import CreateUserDTO from './model/CreateUserDTO';
import FileDTO from './model/FileDTO';
import EmergencyDataDTO from './model/EmergencyDataDTO';
import GeneralDataDTO from './model/GeneralDataDTO';
import HospitalizationDTO from './model/HospitalizationDTO';
import LoginUserDTO from './model/LoginUserDTO';
import MedicalRecordChangeDTO from './model/MedicalRecordChangeDTO';
import MedicalRecordDTO from './model/MedicalRecordDTO';
import MedicationDTO from './model/MedicationDTO';
import PageOfMedicalRecordDTO from './model/PageOfMedicalRecordDTO';
import PathologyDTO from './model/PathologyDTO';
import Sort from './model/Sort';
import UserContactDTO from './model/UserContactDTO';
import UserProfileDTO from './model/UserProfileDTO';
import EmergencydatacontrollerApi from './api/EmergencydatacontrollerApi';
import MedicalrecordcontrollerApi from './api/MedicalrecordcontrollerApi';
import ProfilecontrollerApi from './api/ProfilecontrollerApi';
import UserfrontcontrollerApi from './api/UserfrontcontrollerApi';


/**
* API_Rest_QR_Emergencias.<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var QrEmergenciasWs = require('index'); // See note below*.
* var xxxSvc = new QrEmergenciasWs.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new QrEmergenciasWs.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new QrEmergenciasWs.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new QrEmergenciasWs.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The ApiError model constructor.
     * @property {module:model/ApiError}
     */
    ApiError,

    /**
     * The ApiFieldError model constructor.
     * @property {module:model/ApiFieldError}
     */
    ApiFieldError,

    /**
     * The CreateUserDTO model constructor.
     * @property {module:model/CreateUserDTO}
     */
    CreateUserDTO,

    /**
     * The FileDTO model constructor.
     * @property {module:model/FileDTO}
     */
    FileDTO,

    /**
     * The LoginUserDTO model constructor.
     * The EmergencyDataDTO model constructor.
     * @property {module:model/EmergencyDataDTO}
     */
    EmergencyDataDTO,

    /**
     * The GeneralDataDTO model constructor.
     * @property {module:model/GeneralDataDTO}
     */
    GeneralDataDTO,

    /**
     * The HospitalizationDTO model constructor.
     * @property {module:model/HospitalizationDTO}
     */
    HospitalizationDTO,
     /* The LoginUserDTO model constructor.
     * @property {module:model/LoginUserDTO}
     */
    LoginUserDTO,

    /**
     * The MedicalRecordChangeDTO model constructor.
     * @property {module:model/MedicalRecordChangeDTO}
     */
    MedicalRecordChangeDTO,

    /**
     * The MedicalRecordDTO model constructor.
     * @property {module:model/MedicalRecordDTO}
     */
    MedicalRecordDTO,

    /**
     * The MedicationDTO model constructor.
     * @property {module:model/MedicationDTO}
     */
    MedicationDTO,

    /**
     * The PageOfMedicalRecordDTO model constructor.
     * @property {module:model/PageOfMedicalRecordDTO}
     */
    PageOfMedicalRecordDTO,

    /**
     * The PathologyDTO model constructor.
     * @property {module:model/PathologyDTO}
     */
    PathologyDTO,

    /**
     * The Sort model constructor.
     * @property {module:model/Sort}
     */
    Sort,

    /**
     * The UserContactDTO model constructor.
     * @property {module:model/UserContactDTO}
     */
    UserContactDTO,

    /**
     * The UserProfileDTO model constructor.
     * @property {module:model/UserProfileDTO}
     */
    UserProfileDTO,

    /**
    * The EmergencydatacontrollerApi service constructor.
    * @property {module:api/EmergencydatacontrollerApi}
    */
    EmergencydatacontrollerApi,

    /**
    * The MedicalrecordcontrollerApi service constructor.
    * @property {module:api/MedicalrecordcontrollerApi}
    */
    MedicalrecordcontrollerApi,

    /**
    * The ProfilecontrollerApi service constructor.
    * @property {module:api/ProfilecontrollerApi}
    */
    ProfilecontrollerApi,

    /**
    * The UserfrontcontrollerApi service constructor.
    * @property {module:api/UserfrontcontrollerApi}
    */
    UserfrontcontrollerApi
};
