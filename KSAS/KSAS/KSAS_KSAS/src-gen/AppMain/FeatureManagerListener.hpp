/*
 * AppMain/FeatureManagerListener.hpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#ifndef APPMAIN_FEATUREMANAGERLISTENER_HPP
#define APPMAIN_FEATUREMANAGERLISTENER_HPP

#include <ecorecpp/mapping_forward.hpp>
#include <ecore/EObject.hpp>

#include <AppMain_forward.hpp>

#include <nevonex/application/feature/AbstractFeatureManagerListener.hpp>

namespace AppMain
{

    class FeatureManagerListener: public virtual ::ecore::EObject,
            public ::nevonex::app::feature::AbstractFeatureManagerListener
    {
        /*PROTECTED REGION ID(FeatureManagerListener_commonSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    public:
        FeatureManagerListener();

        virtual ~FeatureManagerListener();

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

        /*PROTECTED REGION ID(FeatureManagerListener) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/

    protected:

        /**
         * \brief For Starting Feature.
         * This method will be notified after the feature is started.
         * Feature developer can use this to do post started operations.
         * \param message
         * \return void
         */
        virtual void handleFeatureStart(const std::string &message) override;

        /**
         * \brief For Stoping Feature.
         * This method will be notified before the feature is stopped.
         * Feature developer can use this to do pre closure operations.
         * \param message
         * \return void
         */
        virtual void handleFeatureStop(const std::string &message) override;

    protected:
        FeatureManagerListener_ptr _this()
        {
            return FeatureManagerListener_ptr(this);
        }

    private:
        // Attributes

        // References

        ::AppMain::KSAS_ptr m_kSAS;

        /*PROTECTED REGION ID(FeatureManagerListener_privateSection) START*/
        // Please, enable the protected region if you add manually written code.
        // To do this, add the keyword ENABLED before START.
        /*PROTECTED REGION END*/
    };

} // AppMain

#endif // APPMAIN_FEATUREMANAGERLISTENER_HPP

