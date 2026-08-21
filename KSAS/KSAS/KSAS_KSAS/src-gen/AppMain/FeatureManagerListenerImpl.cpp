/*
 * AppMain/FeatureManagerListenerImpl.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "FeatureManagerListener.hpp"
#include <stdexcept>

#include <AppMain/KSAS.hpp>
#include <ecore/EObject.hpp>
#include <ecore/EClass.hpp>
#include <ecore/EStructuralFeature.hpp>
#include <ecore/EReference.hpp>
#include <ecore/EOperation.hpp>
#include <ecorecpp/mapping.hpp>

#include <nevonex-fcal-platform/log/Logger.hpp>

/*PROTECTED REGION ID(FeatureManagerListenerImpl.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

#include <nevonex.hpp>

using namespace ::ecore;
using namespace ::nevonex::machine;

using namespace ::AppMain;
using namespace ::nevonex::log;

/*PROTECTED REGION ID(FeatureManagerListenerImpl_Methods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/
void FeatureManagerListener::handleFeatureStart(const std::string &message)
{

    /*PROTECTED REGION ID(FeatureManagerListener_handleFeatureStart) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    NEVONEX_LOG(SeverityLevel::info) << "Feature started callback - "
            << message;
    /*PROTECTED REGION END*/

}

void FeatureManagerListener::handleFeatureStop(const std::string &message)
{

    /*PROTECTED REGION ID(FeatureManagerListener_handleFeatureStop) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    NEVONEX_LOG(SeverityLevel::info) << "Feature is about to stop. Reason - "
            << message;
    /*PROTECTED REGION END*/
}

void FeatureManagerListener::_initialize()
{
    // Supertypes

    // References

    /*PROTECTED REGION ID(FeatureManagerListenerImpl__initialize) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

// Operations from Parent(s)

// Operations

/*PROTECTED REGION ID(FeatureManagerListenerImpl_MethodsEnd) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

