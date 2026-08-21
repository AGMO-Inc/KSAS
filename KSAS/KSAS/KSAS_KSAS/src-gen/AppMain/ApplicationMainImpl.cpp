/*
 * AppMain/ApplicationMainImpl.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "ApplicationMain.hpp"
#include <stdexcept>

#include <AppMain/KSAS.hpp>
#include <ecore/EObject.hpp>
#include <ecore/EClass.hpp>
#include <ecore/EStructuralFeature.hpp>
#include <ecore/EReference.hpp>
#include <ecore/EOperation.hpp>
#include <ecorecpp/mapping.hpp>

#include <nevonex-fcal-platform/log/Logger.hpp>

/*PROTECTED REGION ID(ApplicationMainImpl.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/
#include <boost/log/core.hpp>
#include <boost/log/trivial.hpp>
#include <boost/log/expressions.hpp>
#include <boost/exception/diagnostic_information.hpp>
#include <boost/lexical_cast.hpp>

#include <ecore/EAttribute.hpp>
#include <ecorecpp/mapping.hpp>

#include <nevonex.hpp>
#include <nevonex/common/ProviderEnum.hpp>
#include <nevonex/exception/CommunicationException.hpp>
#include <nevonex/exception/NotInitializedException.hpp>

#include "web/SampleRouteFactory.hpp"
#include "web/WebSocketEndPoint.hpp"

/*PROTECTED REGION ID(ApplicationMainImpl_Headers) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::ecore;
using namespace ::ecorecpp::mapping;

using namespace ::nevonex;
using namespace ::nevonex::fcal;
using namespace ::nevonex::common;
using namespace ::nevonex::types;

/*PROTECTED REGION ID(ApplicationMainImpl_AddnlMethods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::AppMain;
using namespace ::nevonex::log;

/*PROTECTED REGION ID(ApplicationMainImpl_Methods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/
int main()
{
    /*PROTECTED REGION ID(ApplicationMain_Main) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

    try
    {
        ApplicationMain *sa = new ApplicationMain();
        // Calling runtime to start the application
        std::vector < std::string > vec;

        /*PROTECTED REGION ID(ApplicationMain_MainBeforeInitialize) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

        sa->initialize(vec);

        sa->addCustomUIListener();

        /*PROTECTED REGION ID(ApplicationMain_MainBeforeRuntime) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

        /*PROTECTED REGION ID(ApplicationMain_MainAfterRuntime) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        sa->addProcessTimer();

        /*PROTECTED REGION END*/

        sa->start();
    } catch (const std::exception &ex)
    {
        NEVONEX_LOG(SeverityLevel::fatal) << boost::diagnostic_information(ex);
    }
}

void ApplicationMain::onStart(::nevonex::feature::AbstractMachine_ptr machine)
{
    /*PROTECTED REGION ID(Machine_onStart_First) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

    /*PROTECTED REGION ID(Machine_onStart_AdditionalMethods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

bool ApplicationMain::onStart(
        ::nevonex::feature::AbstractMachineProvider_ptr provider)
{
    /*PROTECTED REGION ID(Provider_onStart_First) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

    /*PROTECTED REGION ID(Provider_onStart_AdditionalMethods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
    addProcessTimer();

    /*PROTECTED REGION END*/

    return true;
}

void ApplicationMain::_initialize()
{
    // Supertypes

    // References

    /*PROTECTED REGION ID(ApplicationMainImpl__initialize) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

// Operations from Parent(s)

// Operations

void ApplicationMain::addProcessTimer()
{

    static bool atleastOneMachineCreated = false;
    if (!atleastOneMachineCreated)
    {
        ProcessTimer(m_kSAS, 1000);
        atleastOneMachineCreated = true;
    }
    else
    {
        NEVONEX_LOG(SeverityLevel::warning) << "Timer already created.";
    }

}

void ApplicationMain::addCustomUIListener()
{

    using namespace ::AppMain::web;

    /*PROTECTED REGION ID(AppMainImpl_addCustomUIListener) START*/

    std::shared_ptr < SampleRouteFactory > sampleRouteFactorySharedPtr =
            std::make_shared< SampleRouteFactory >();
    sampleRouteFactorySharedPtr->setKSAS(getKSAS());
    customui::UIWebServiceProvider::getInstance()->registerRoute("/helloworld",
            sampleRouteFactorySharedPtr);

    std::shared_ptr < WebSocketEndPoint > webSocketEndPointsSharedPtr =
            WebSocketEndPoint::getInstance();
    getKSAS()->setWebSocketEndPoint(webSocketEndPointsSharedPtr);
    webSocketEndPointsSharedPtr->setKSAS(getKSAS());
    customui::UIWebServiceProvider::getInstance()->registerWebsocketRoute(
            "/socket", webSocketEndPointsSharedPtr);

    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

}

/*PROTECTED REGION ID(ApplicationMainImpl_MethodsEnd) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

