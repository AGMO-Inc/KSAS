/*
 * AppMain_forward.hpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#ifndef _APPMAIN_FORWARD_HPP
#define _APPMAIN_FORWARD_HPP

#include <ecorecpp/mapping_forward.hpp>
#include <boost/filesystem/path.hpp>
#include <boost/property_tree/ptree.hpp>
#include <nevonex/propertychange/PropertyChangeListener.hpp>
#include <nevonex/machine/InterfaceDetails.hpp>

/*PROTECTED REGION ID(AppMain_forward) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
// Additional headers here
/*PROTECTED REGION END*/

// EPackage
#include <AppMain/web_forward.hpp>

#include <ecore_forward.hpp> // for EDataTypes

namespace AppMain
{

// EDataType

// EClass

// ApplicationMain
    class ApplicationMain;
    using ApplicationMain_ptr = ::ecore::Ptr<ApplicationMain>;

// ApplicationInputData
    class ApplicationInputData;
    using ApplicationInputData_ptr = ::ecore::Ptr<ApplicationInputData>;

// IController
    class IController;
    using IController_ptr = ::ecore::Ptr<IController>;

// KSAS
    class KSAS;
    using KSAS_ptr = ::ecore::Ptr<KSAS>;

// FeatureManagerListener
    class FeatureManagerListener;
    using FeatureManagerListener_ptr = ::ecore::Ptr<FeatureManagerListener>;

// IgnitionStateListener
    class IgnitionStateListener;
    using IgnitionStateListener_ptr = ::ecore::Ptr<IgnitionStateListener>;

// EEnum

}// AppMain

#endif // _APPMAIN_FORWARD_HPP

