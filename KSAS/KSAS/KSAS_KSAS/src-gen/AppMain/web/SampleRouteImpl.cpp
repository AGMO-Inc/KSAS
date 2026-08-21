/*
 * AppMain/web/SampleRouteImpl.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "SampleRoute.hpp"
#include <stdexcept>

#include <AppMain/KSAS.hpp>
#include <ecore/EObject.hpp>
#include <ecore/EClass.hpp>
#include <ecore/EStructuralFeature.hpp>
#include <ecore/EReference.hpp>
#include <ecore/EOperation.hpp>
#include <ecorecpp/mapping.hpp>

#include <nevonex-fcal-platform/log/Logger.hpp>

/*PROTECTED REGION ID(SampleRouteImpl.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

#include <nevonex.hpp>

#include <boost/log/core.hpp>
#include <boost/log/trivial.hpp>
#include <boost/exception/diagnostic_information.hpp>
/*PROTECTED REGION ID(SampleRoute_additional_headers_Impl) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::AppMain::web;
using namespace ::nevonex::log;

/*PROTECTED REGION ID(SampleRouteImpl_Methods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

void SampleRoute::handleGet(Poco::Net::HTTPServerRequest &req,
        Poco::Net::HTTPServerResponse &response)
{
    /*PROTECTED REGION ID(SampleRoute_handleGet) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);
    response.setContentType("text/html");

    std::ostream &out = response.send();
    out << "<h1>Hello world!</h1>" << "<p>Host: " << req.getHost() << "</p>"
            << "<p>Method: " << req.getMethod() << "</p>" << "<p>URI: "
            << req.getURI() << "</p>";
    out.flush();

    /*PROTECTED REGION END*/
}

void SampleRoute::handlePost(Poco::Net::HTTPServerRequest &req,
        Poco::Net::HTTPServerResponse &response)
{
    /*PROTECTED REGION ID(SampleRoute_handlePost) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    response.setStatus(Poco::Net::HTTPResponse::HTTP_OK);
    response.setContentType("text/html");

    std::ostream &out = response.send();
    out << "<h1>Hello world!</h1>" << "<p>Host: " << req.getHost() << "</p>"
            << "<p>Method: " << req.getMethod() << "</p>" << "<p>URI: "
            << req.getURI() << "</p>";
    out.flush();

    /*PROTECTED REGION END*/

}

void SampleRoute::_initialize()
{
    // Supertypes

    // References

    /*PROTECTED REGION ID(SampleRouteImpl__initialize) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

// Operations from Parent(s)

// Operations

/*PROTECTED REGION ID(SampleRouteImpl_MethodsEnd) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

