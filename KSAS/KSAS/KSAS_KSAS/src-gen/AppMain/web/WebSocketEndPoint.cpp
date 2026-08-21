/*
 * AppMain/web/WebSocketEndPoint.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "WebSocketEndPoint.hpp"
#include <AppMain/KSAS.hpp>
#include <ecore/EObject.hpp>
#include <ecore/EClass.hpp>
#include <ecorecpp/mapping.hpp>
#include <algorithm>
#include <nevonex/fcb/SubscriberEnum.hpp>
#include <nevonex-fcal-platform/log/Logger.hpp>

#if BOOST_VERSION >= 106501
#define BOOST_STACKTRACE_HEADERS_FOUND
#include <boost/stacktrace.hpp>
#endif

/*PROTECTED REGION ID(WebSocketEndPoint.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::AppMain::web;
using namespace ::nevonex::log;

// Default constructor
WebSocketEndPoint::WebSocketEndPoint() : m_kSAS(0)
{

    websocket = nullptr;

    /*PROTECTED REGION ID(WebSocketEndPoint__WebSocketEndPoint) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

}

WebSocketEndPoint::~WebSocketEndPoint()
{

    /*PROTECTED REGION ID(WebSocketEndPoint__Destructor) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

}

// Attributes

// References

::AppMain::KSAS_ptr WebSocketEndPoint::getKSAS() const
{
    return m_kSAS;
}

void WebSocketEndPoint::setKSAS(::AppMain::KSAS_ptr _kSAS)
{

    m_kSAS = _kSAS;

}

