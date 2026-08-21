/*
 * AppMain/IgnitionStateListener.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "IgnitionStateListener.hpp"
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

/*PROTECTED REGION ID(IgnitionStateListener.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::AppMain;
using namespace ::nevonex::log;

// Default constructor
IgnitionStateListener::IgnitionStateListener() : m_kSAS(0)
{

    /*PROTECTED REGION ID(IgnitionStateListener__IgnitionStateListener) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

}

IgnitionStateListener::~IgnitionStateListener()
{

    /*PROTECTED REGION ID(IgnitionStateListener__Destructor) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

}

// Attributes

// References

::AppMain::KSAS_ptr IgnitionStateListener::getKSAS() const
{
    return m_kSAS;
}

void IgnitionStateListener::setKSAS(::AppMain::KSAS_ptr _kSAS)
{

    m_kSAS = _kSAS;

}

