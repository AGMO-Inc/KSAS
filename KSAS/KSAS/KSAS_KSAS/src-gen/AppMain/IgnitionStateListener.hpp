/*
 * AppMain/IgnitionStateListener.hpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#ifndef APPMAIN_IGNITIONSTATELISTENER_HPP
#define APPMAIN_IGNITIONSTATELISTENER_HPP

#include <ecorecpp/mapping_forward.hpp>
#include <ecore/EObject.hpp>

#include <AppMain_forward.hpp>

#include <nevonex-fcal-platform/notify/AbstractIgnitionStateNotification.hpp>

namespace AppMain
{

    class IgnitionStateListener: public virtual ::ecore::EObject,
            public ::nevonex::notify::AbstractIgnitionStateNotification
    {
        /*PROTECTED REGION ID(IgnitionStateListener_commonSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    public:
        IgnitionStateListener();

        virtual ~IgnitionStateListener();

        virtual void _initialize() override;

        // Operations from Parent(s)

        // Operations

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

        /*PROTECTED REGION ID(IgnitionStateListener) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    protected:

        /**
         * \brief For Ignition On Feature.
         * This method is notified once the feature is started.
         * Feature developer can use this to do post ignition on operations.
         * \return void
         */
        virtual void handleIgnitionOn() override;

        /**
         * \brief For Ignition Off Feature.
         * This method is notified once the feature is being stopped.
         * Feature developer can use this to do pre ignition off operations.
         * \return void
         */
        virtual void handleIgnitionOff() override;

    protected:
        IgnitionStateListener_ptr _this()
        {
            return IgnitionStateListener_ptr(this);
        }

    private:
        // Attributes

        // References

        ::AppMain::KSAS_ptr m_kSAS;

        /*PROTECTED REGION ID(IgnitionStateListener_privateSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/
    };

} // AppMain

#endif // APPMAIN_IGNITIONSTATELISTENER_HPP

