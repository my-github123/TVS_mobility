// src/utils/arrayUtils.js

export const removeDuplicates = (arr) => {
    return [...new Set(arr)];
  };
  
  // src/utils/arrayUtils.js

export const arrayIntersection = (arr1, arr2) => {
    return arr1.filter(value => arr2.includes(value));
  };

  // src/utils/arrayUtils.js

export const flattenArray = (arr) => {
    return arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flattenArray(val) : val), []);
  };
  


//   import { removeDuplicates, arrayIntersection, flattenArray } from './utils/arrayUtils';
// import { mergeObjects, deepMergeObjects } from './utils/objectUtils';
// import { truncateString, toCamelCase } from './utils/stringUtils';
// import { getRandomNumber, formatCurrency } from './utils/numberUtils';
// import { formatDate, dateDiffInDays } from './utils/dateUtils';
// import { debounce, throttle } from './utils/miscUtils';

// // Example usage
// const uniqueArray = removeDuplicates([1, 2, 2, 3, 4, 4]);
// const commonElements = arrayIntersection([1, 2, 3], [2, 3, 4]);
// const flattenedArray = flattenArray([1, [2, [3, [4]]]]);
// const mergedObject = mergeObjects({ a: 1 }, { b: 2 });
// const deeplyMergedObject = deepMergeObjects({ a: { b: 1 } }, { a: { c: 2 } });
// const truncated = truncateString('This is a very long string', 10);
// const camelCaseString = toCamelCase('hello_world');
// const randomNum = getRandomNumber(1, 100);
// const currency = formatCurrency(1234.56);
// const formattedDate = formatDate('2024-05-21', 'YYYY-MM-DD');
// const daysDiff = dateDiffInDays(new Date('2024-05-21'), new Date('2024-06-21'));
// const debouncedFunction = debounce(() => console.log('Debounced!'), 300);
//const throttledFunction = throttle(() => console.log('Throttled!'), 300);



      // updatePhotoState(setRcPhoto, 0, response.data.rcFrontPhoto || '');
      // updatePhotoState(setRcPhoto, 1, response.data.rcBackPhoto || ''); // Default to empty string if rcBackPhoto is not present
      // updatePhotoState(setRcPhoto, 2, response.data.RCOthers || '');
      // updatePhotoState(
      //   setInsuracePhoto,
      //   0,
      //   response.data.insuranceOwnDamagePhoto || '',
      // );
      // updatePhotoState(
      //   setInsuracePhoto,
      //   1,
      //   response.data.insuranceThirdPartyPhoto || '',
      // );
      // updatePhotoState(
      //   setInsuracePhoto,
      //   2,
      //   response.data.insuranceOthers || '',
      // );
      // updatePhotoState(setNOCPhoto, 0, response.data.nocPhoto || '');
      // updatePhotoState(setNOCPhoto, 1, response.data.nocOthers || '');
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   0,
      //   response.data.frontViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   1,
      //   response.data.rearViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   2,
      //   response.data.lhsViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   3,
      //   response.data.rhsViewPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   4,
      //   response.data.odometerPhoto || '',
      // );
      // updatePhotoState(setPhotoUrisCarPhotos, 5, response.data.roofPhoto || '');
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   6,
      //   response.data.interiorPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   7,
      //   response.data.underChassisPhoto || '',
      // );
      // updatePhotoState(
      //   setPhotoUrisCarPhotos,
      //   8,
      //   response.data.engineRoomPhoto || '',
      // );
      // updatePhotoState(updatePhotoState, 9, response.data.trunkBootPhoto || '');
      // updatePhotoState(
      //   setChassisPunchPhoto,
      //   0,
      //   response.data.chassisPunchPhoto || '',
      // );
      // updatePhotoState(
      //   setVinPlatePunchPhoto,
      //   0,
      //   response.data.vinPlatePhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   0,
      //   response.data.frontTyreLeftPhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   1,
      //   response.data.frontTyreRightPhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   2,
      //   response.data.rearTyreLeftPhoto || '',
      // );
      // updatePhotoState(
      //   setTyrePunchPhoto,
      //   3,
      //   response.data.rearTyreRightPhoto || '',
      // );
      // updatePhotoState(
      //   setSpareWheelPunchPhoto,
      //   0,
      //   response.data.spareWheelPhoto || '',
      // );
      // updatePhotoState(
      //   setToolkitPunchPhoto,
      //   0,
      //   response.data.toolKitJackPhoto || '',
      // );
      // updatePhotoState(
      //   setKeyPunchPhoto,
      //   0,
      //   response.data.primaryKeyPhoto || '',
      // );
      // updatePhotoState(setKeyPunchPhoto, 1, response.data.spareKeyPhoto || '');
      // updatePhotoState(
      //   setPillarsPhoto,
      //   0,
      //   response.data.pillarALeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   1,
      //   response.data.pillarARightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   2,
      //   response.data.pillarBLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   3,
      //   response.data.pillarBRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   4,
      //   response.data.pillarCLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setPillarsPhoto,
      //   5,
      //   response.data.pillarCRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setApronPhoto,
      //   0,
      //   response.data.apronLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setApronPhoto,
      //   1,
      //   response.data.apronRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setFendersPhoto,
      //   0,
      //   response.data.fendersLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setFendersPhoto,
      //   1,
      //   response.data.fendersRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setQuarterPanlesPhoto,
      //   0,
      //   response.data.quarterPanelsLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setQuarterPanlesPhoto,
      //   1,
      //   response.data.quarterPanelsRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setRunningBoardPhoto,
      //   0,
      //   response.data.runningBoardLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setRunningBoardPhoto,
      //   1,
      //   response.data.runningBoardRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   0,
      //   response.data.doorsFrontLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   1,
      //   response.data.doorsFrontRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   2,
      //   response.data.doorsRearLeftSidePhoto || '',
      // );
      // updatePhotoState(
      //   setDoorPhoto,
      //   3,
      //   response.data.doorsRearRightSidePhoto || '',
      // );
      // updatePhotoState(setDickyDoorPhoto, 0, response.data.bootPhoto || '');
      // updatePhotoState(
      //   setDickySkirtPhoto,
      //   0,
      //   response.data.bootSkirtPhoto || '',
      // );
      // updatePhotoState(setBonetPhoto, 0, response.data.bonetPhoto || '');
      // updatePhotoState(setBumperPhoto, 0, response.data.bumperFrontPhoto || '');
      // updatePhotoState(setBumperPhoto, 1, response.data.bumperRearPhoto || '');

      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   0,
      //   response.data.supportMemberUpperPhoto || '',
      // );
      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   1,
      //   response.data.supportMemberLowerPhoto || '',
      // );
      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   2,
      //   response.data.headLampSupportRightSidePhoto || '',
      // );
      // updatePhotoState(
      //   setSupportMembersPhoto,
      //   3,
      //   response.data.headLampSupportLeftSidePhoto || '',
      // );

      // updatePhotoState(
      //   setWheelTypePhoto,
      //   0,
      //   response.data.wheelTypeAlloyPhoto || '',
      // );
      // updatePhotoState(
      //   setWheelTypePhoto,
      //   1,
      //   response.data.wheelTypeDrumPhoto || '',
      // );
      // updatePhotoState(
      //   setWindShieldPhoto,
      //   0,
      //   response.data.windShieldFrontTyrePhoto || '',
      // );
      // updatePhotoState(
      //   setWindShieldPhoto,
      //   1,
      //   response.data.windShieldRearTyrePhoto || '',
      // );

      // updatePhotoState(setSuspensionPhoto, 0, response.data.strutPhoto || '');
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   1,
      //   response.data.lowerArmPhoto || '',
      // );
      // updatePhotoState(setSuspensionPhoto, 2, response.data.linkRodPhoto || '');
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   3,
      //   response.data.stabilizerBarPhoto || '',
      // );
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   4,
      //   response.data.shockAbsorberPhoto || '',
      // );
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   5,
      //   response.data.coilSpringPhoto || '',
      // );
      // updatePhotoState(
      //   setSuspensionPhoto,
      //   6,
      //   response.data.leafSpringPhoto || '',
      // );

      // updatePhotoState(
      //   setSteeringPhoto,
      //   0,
      //   response.data.rackAndPinionPhoto || '',
      // );

      // updatePhotoState(
      //   setSteeringPhoto,
      //   1,
      //   response.data.steeringColumnPhoto || '',
      // );

      // updatePhotoState(setSteeringPhoto, 2, response.data.hardnessPhoto || '');

      // updatePhotoState(
      //   setSteeringPhoto,
      //   3,
      //   response.data.ballJointEndPhoto || '',
      // );

      // updatePhotoState(setBrakePhoto, 0, response.data.padPhoto || '');
      // updatePhotoState(setBrakePhoto, 1, response.data.discPhoto || '');
      // updatePhotoState(setBrakePhoto, 2, response.data.shoePhoto || '');
      // updatePhotoState(setBrakePhoto, 3, response.data.drumPhoto || '');
      // updatePhotoState(
      //   setBrakePhoto,
      //   4,
      //   response.data.wheelCylinderPhoto || '',
      // );
      // updatePhotoState(setBrakePhoto, 5, response.data.mcBoosterPhoto || '');

      // updatePhotoState(
      //   setTransmissionPhoto,
      //   0,
      //   response.data.clutchPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   1,
      //   response.data.gearShiftingPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   2,
      //   response.data.driveShaftPhoto || '',
      // );
      // updatePhotoState(setTransmissionPhoto, 3, response.data.axlePhoto || '');
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   4,
      //   response.data.propellerShaftPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   5,
      //   response.data.differentialPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   6,
      //   response.data.bearingPhoto || '',
      // );
      // updatePhotoState(
      //   setTransmissionPhoto,
      //   7,
      //   response.data.mountingPhoto || '',
      // );

      // updatePhotoState(setEnginePhoto, 0, response.data.smokePhoto);
      // updatePhotoState(setEnginePhoto, 1, response.data.turboPhoto);
      // updatePhotoState(setEnginePhoto, 2, response.data.misfiringPhoto);
      // updatePhotoState(setEnginePhoto, 3, response.data.tappetPhoto);
      // updatePhotoState(setEnginePhoto, 4, response.data.knockingPhoto);
      // updatePhotoState(setEnginePhoto, 5, response.data.exhaustPhoto);
      // updatePhotoState(setEnginePhoto, response.data.beltsPhoto);
      // updatePhotoState(setEnginePhoto, response.data.tensionerPhoto);
      // updatePhotoState(setEnginePhoto, response.data.mountingPhoto);

      // updatePhotoState(setEnginePhoto, 9, response.data.fuelPumpPhoto);
      // updatePhotoState(setEnginePhoto, 10, response.data.highPressurePumpPhoto);
      // updatePhotoState(setEnginePhoto, 11, response.data.commonrailPhoto);
      // updatePhotoState(setEnginePhoto, 12, response.data.injectorPhoto);
      // updatePhotoState(setEnginePhoto, 13, response.data.fuelTankPhoto);
      // updatePhotoState(setEnginePhoto, 14, response.data.hosePhoto);
      // updatePhotoState(setEnginePhoto, 15, response.data.radiatorPhoto);
      // updatePhotoState(setEnginePhoto, 16, response.data.fanPhoto);
      // updatePhotoState(setEnginePhoto, 17, response.data.overHeatingPhoto);
      // updatePhotoState(setEnginePhoto, 18, response.data.allBearingsPhoto);

      // updatePhotoState(setElectricalPhoto, 0, response.data.batteryPhoto);
      // updatePhotoState(setElectricalPhoto, 1, response.data.alternatorPhoto);
      // updatePhotoState(setElectricalPhoto, 2, response.data.selfMotorPhoto);
      // updatePhotoState(setElectricalPhoto, 3, response.data.wiringHarnessPhoto);
      // updatePhotoState(setElectricalPhoto, 4, response.data.ecmPhoto);
      // updatePhotoState(setElectricalPhoto, 5, response.data.allSensorsPhoto);
      // updatePhotoState(setElectricalPhoto, 6, response.data.wiperMotorPhoto);
      // updatePhotoState(setElectricalPhoto, 7, response.data.clusterPhoto);
      // updatePhotoState(
      //   setElectricalPhoto,
      //   8,
      //   response.data.headLightsAndDrlPhoto,
      // );

      // updatePhotoState(setElectricalPhoto, 9, response.data.tailLightPhoto);
      // updatePhotoState(setElectricalPhoto, 10, response.data.cabinLightPhoto);
      // updatePhotoState(
      //   setElectricalPhoto,
      //   11,
      //   response.data.combinationSwitchPhoto,
      // );
      // updatePhotoState(setElectricalPhoto, 12, response.data.absPhoto);

      // updatePhotoState(setElectricalPhoto, 13, response.data.airBagPhoto);
      // updatePhotoState(setElectricalPhoto, 14, response.data.powerWindowsPhoto);

      // updatePhotoState(setAcPhoto, 0, response.data.coolingPhoto);
      // updatePhotoState(setAcPhoto, 1, response.data.blowerCondenserPhoto);
      // updatePhotoState(setAcPhoto, 2, response.data.fanPhoto);
      // updatePhotoState(setAcPhoto, 3, response.data.controlSwitchPhoto);
      // updatePhotoState(setAcPhoto, 4, response.data.ventPhoto);

      // updatePhotoState(setAccessoriesPhoto, 0, response.data.musicSystemPhoto);
      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   1,
      //   response.data.parkingSensorPhoto,
      // );
      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   2,
      //   response.data.reverseCameraPhoto,
      // );
      // updatePhotoState(setAccessoriesPhoto, 3, response.data.ovrmAdjusterPhoto);
      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   4,
      //   response.data.seatHeightAdjusterPhoto,
      // );
      // updatePhotoState(setAccessoriesPhoto, 5, response.data.seatBeltPhoto);
      // updatePhotoState(setAccessoriesPhoto, 6, response.data.sunRoofPhoto);
      // updatePhotoState(setAccessoriesPhoto, 7, response.data.roofRailPhoto);
      // updatePhotoState(setAccessoriesPhoto, 8, response.data.spoilerPhoto);
      // updatePhotoState(setAccessoriesPhoto, 9, response.data.skirtPhoto);

      // updatePhotoState(
      //   setAccessoriesPhoto,
      //   10,
      //   response.data.steeringControlsPhoto,
      // );
