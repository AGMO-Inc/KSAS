/*
 * AppMain/ApplicationMain.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "ApplicationMain.hpp"
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

#include <AppMain/FeatureManagerListener.hpp>
#include <AppMain/IgnitionStateListener.hpp>

/*PROTECTED REGION ID(ApplicationMain.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::AppMain;
using namespace ::nevonex::log;

// Default constructor
ApplicationMain::ApplicationMain() : m_kSAS(0)
{

    m_kSAS = ::ecore::Ptr < KSAS > (new KSAS);
    auto featureManagerListener = std::unique_ptr < FeatureManagerListener
            > (new FeatureManagerListener());
    featureManagerListener->setKSAS(m_kSAS);
    setFeatureManager(std::move(featureManagerListener));

    auto ignitionStateListener = std::unique_ptr < IgnitionStateListener
            > (new IgnitionStateListener());
    ignitionStateListener->setKSAS(m_kSAS);
    setIgnitionStateManager(std::move(ignitionStateListener));

    /*PROTECTED REGION ID(ApplicationMain__ApplicationMain) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

}

ApplicationMain::~ApplicationMain()
{

    /*PROTECTED REGION ID(ApplicationMain__Destructor) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

}

// Attributes

// References

::AppMain::KSAS_ptr ApplicationMain::getKSAS() const
{
    return m_kSAS;
}

void ApplicationMain::setKSAS(::AppMain::KSAS_ptr _kSAS)
{

    m_kSAS = _kSAS;

}

