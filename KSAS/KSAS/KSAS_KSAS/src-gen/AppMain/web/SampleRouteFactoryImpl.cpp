/*
 * AppMain/web/SampleRouteFactoryImpl.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "SampleRouteFactory.hpp"
#include <stdexcept>

#include <AppMain/KSAS.hpp>
#include <ecore/EObject.hpp>
#include <ecore/EClass.hpp>
#include <ecore/EStructuralFeature.hpp>
#include <ecore/EReference.hpp>
#include <ecore/EOperation.hpp>
#include <ecorecpp/mapping.hpp>

#include <nevonex-fcal-platform/log/Logger.hpp>

/*PROTECTED REGION ID(SampleRouteFactoryImpl.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

#include "SampleRoute.hpp"

#include <boost/log/core.hpp>
#include <boost/log/trivial.hpp>
#include <boost/exception/diagnostic_information.hpp>
/*PROTECTED REGION ID(SampleRouteFactory_additional_headers_Impl) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::AppMain::web;
using namespace ::nevonex::log;

/*PROTECTED REGION ID(SampleRouteFactoryImpl_Methods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

::nevonex::web::server::NevonexRoute* SampleRouteFactory::createRoute(
        const Poco::Net::HTTPServerRequest &request)
{
    SampleRoute *sampleRoute = new SampleRoute();
    sampleRoute->setKSAS(getKSAS());
    return sampleRoute;
}

void SampleRouteFactory::disconnect()
{
    /*PROTECTED REGION ID(SampleRouteFactoryImpl__disconnect) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

void SampleRouteFactory::_initialize()
{
    // Supertypes

    // References

    /*PROTECTED REGION ID(SampleRouteFactoryImpl__initialize) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

// Operations from Parent(s)

// Operations

/*PROTECTED REGION ID(SampleRouteFactoryImpl_MethodsEnd) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

