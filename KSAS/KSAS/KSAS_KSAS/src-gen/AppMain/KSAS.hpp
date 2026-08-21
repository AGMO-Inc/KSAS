/*
 * AppMain/KSAS.hpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#ifndef APPMAIN_KSAS_HPP
#define APPMAIN_KSAS_HPP

#include <ecorecpp/mapping_forward.hpp>

#include <AppMain_forward.hpp>

#include <AppMain/ApplicationInputData.hpp>
#include <AppMain/IController.hpp>

#include <nevonex.hpp>

using namespace ::ecore;
using namespace ::ecorecpp::mapping;

using namespace ::nevonex;
using namespace ::nevonex::fcal;
using namespace ::nevonex::common;
using namespace ::nevonex::types;

/*PROTECTED REGION ID(KSAS_pre) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

namespace AppMain
{

    class KSAS: public virtual ::AppMain::ApplicationInputData,
            public virtual ::AppMain::IController
    {
        /*PROTECTED REGION ID(KSAS_commonSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    public:
        KSAS();

        virtual ~KSAS();

        virtual void _initialize() override;

        // Operations from Parent(s)

        // Operations

        // Attributes

        // References
    public:

        /*PROTECTED REGION ID(KSAS) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    protected:
        virtual void start(const int intervalInMilliSecond) override;
        void run();
    public:
        void setWebSocketEndPoint(
                std::shared_ptr< web::WebSocketEndPoint > &webSocketEndPoint);
    private:
        std::shared_ptr< web::WebSocketEndPoint > webSocketEndPoint;

    protected:
        KSAS_ptr _this()
        {
            return KSAS_ptr(this);
        }

    private:
        // Attributes

        // References

        /*PROTECTED REGION ID(KSAS_privateSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/
    };

} // AppMain

#endif // APPMAIN_KSAS_HPP

