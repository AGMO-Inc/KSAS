/*
 * AppMain/ApplicationMain.hpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#ifndef APPMAIN_APPLICATIONMAIN_HPP
#define APPMAIN_APPLICATIONMAIN_HPP

#include <ecorecpp/mapping_forward.hpp>
#include <ecore/EObject.hpp>

#include <AppMain_forward.hpp>

#include <nevonex/application/NEVONEXApplication.hpp>
#include <nevonex/feature/AbstractMachine.hpp>
#include <nevonex/feature/AbstractMachineProvider.hpp>

#include <nevonex_forward.hpp>
/*PROTECTED REGION ID(ApplicationMain_pre) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

namespace AppMain
{

    class ApplicationMain: public virtual ::ecore::EObject,
            public virtual ::nevonex::NEVONEXApplication
    {
        /*PROTECTED REGION ID(ApplicationMain_commonSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    public:
        ApplicationMain();

        virtual ~ApplicationMain();

        virtual void _initialize() override;

        // Operations from Parent(s)

        // Operations

        /**
         * \brief This method schedules the controller to be called in particular interval of time.
         *
         * \return void 
         */
        virtual void addProcessTimer();

        /**
         * \brief 
         *
         * \return void 
         */
        virtual void addCustomUIListener();

        // Attributes

        // References
        /**
         * \brief 
         */
    public:
        virtual ::AppMain::KSAS_ptr getKSAS() const;
        /**
         * \brief 
         */
    public:
        virtual void setKSAS(::AppMain::KSAS_ptr _kSAS);

    public:

        /*PROTECTED REGION ID(ApplicationMain) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    public:
        /**
         * This method is a callback once a Machine is connected/started. (ie. DOM for the device is received from FIL)
         * 
         * \param machine Machine instance
         */
        virtual void onStart(::nevonex::feature::AbstractMachine_ptr machine)
                override;

        /**
         * This method is a callback after any Machine(s) connected/started. (ie. DOM for the device is received from FIL)
         * Deprecated since 5.0. Use onStart(machine)
         * 
         * \param provider Machine provider instance
         */
        virtual bool onStart(
                ::nevonex::feature::AbstractMachineProvider_ptr provider)
                        override;

    protected:
        ApplicationMain_ptr _this()
        {
            return ApplicationMain_ptr(this);
        }

    private:
        // Attributes

        // References

        ::AppMain::KSAS_ptr m_kSAS;

        /*PROTECTED REGION ID(ApplicationMain_privateSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/
    };

} // AppMain

#endif // APPMAIN_APPLICATIONMAIN_HPP

