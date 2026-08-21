/*
 * AppMain/KSASImpl.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "KSAS.hpp"
#include <stdexcept>

#include <AppMain/ApplicationInputData.hpp>
#include <AppMain/IController.hpp>
#include <ecore/EObject.hpp>
#include <ecore/EClass.hpp>
#include <ecore/EStructuralFeature.hpp>
#include <ecore/EReference.hpp>
#include <ecore/EOperation.hpp>
#include <ecorecpp/mapping.hpp>

#include <nevonex-fcal-platform/log/Logger.hpp>

/*PROTECTED REGION ID(KSASImpl.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/
#include <boost/log/core.hpp>
#include <boost/log/trivial.hpp>
#include <boost/log/expressions.hpp>
#include <boost/exception/diagnostic_information.hpp>

#include <nevonex.hpp>

#include "web/WebSocketEndPoint.hpp"

/*PROTECTED REGION ID(KSASImpl_Headers) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::ecore;
using namespace ::ecorecpp::mapping;

using namespace ::nevonex;
using namespace ::nevonex::fcal;
using namespace ::nevonex::common;
using namespace ::nevonex::types;

using namespace ::AppMain;
using namespace ::nevonex::log;

/*PROTECTED REGION ID(KSASImpl_Methods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/
void KSAS::run()
{
    /*PROTECTED REGION ID(KSASImpl_runStart) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/

    try
    {
        // Write your application logic by enabling the protected regions.

        /*PROTECTED REGION ID(KSASImpl_RunAdditionalSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/
    } catch (...)
    {
        NEVONEX_LOG(SeverityLevel::error) << "Exception in KSAS::run:"
                << boost::current_exception_diagnostic_information();
    }
    /*PROTECTED REGION ID(KSASImpl_runEnd) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

void KSAS::start(const int intervalInMilliSecond)
{
    NEVONEX_LOG(SeverityLevel::trace) << "Controller run method started";

    using namespace std::chrono;
    system_clock::time_point begin = system_clock::now();
    this->run();
    system_clock::time_point end = system_clock::now();
    int timeTaken = duration_cast < milliseconds > (end - begin).count();
    if (timeTaken > intervalInMilliSecond)
    {
        //Total time taken to execute the Run method should be less than the given interval. Else consider increasing the interval.
        NEVONEX_LOG(SeverityLevel::warning)
                << "Run method taking more time than interval. Time take is "
                << std::to_string(timeTaken) << "ms";
    }
}

void KSAS::setWebSocketEndPoint(
        std::shared_ptr< web::WebSocketEndPoint > &webSocketEndPoint)
{
    this->webSocketEndPoint = webSocketEndPoint;
}

void KSAS::_initialize()
{
    // Supertypes
    ::AppMain::ApplicationInputData::_initialize();
    ::AppMain::IController::_initialize();

    // References

    /*PROTECTED REGION ID(KSASImpl__initialize) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

// Operations from Parent(s)

// Operations

/*PROTECTED REGION ID(KSASImpl_MethodsEnd) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

