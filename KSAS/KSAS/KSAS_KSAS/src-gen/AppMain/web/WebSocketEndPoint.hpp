/*
 * AppMain/web/WebSocketEndPoint.hpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#ifndef APPMAIN_WEB_WEBSOCKETENDPOINT_HPP
#define APPMAIN_WEB_WEBSOCKETENDPOINT_HPP

#include <ecorecpp/mapping_forward.hpp>
#include <ecore/EObject.hpp>

#include <AppMain/web_forward.hpp>

#include <AppMain_forward.hpp>

#include <nevonex-fcal-platform/web/server/WebSocketRouteFactory.hpp>
#include <nevonex-fcal-platform/web/server/MessageQueueWebsocket.hpp>

#include <nevonex-fcal-platform/common/CommonUtils.hpp>

/*PROTECTED REGION ID(WebSocketEndPoint_rapidjson_define_headers) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
// Uncomment the below line to add Rapidjson support. JsonCPP will be disabled.
// #define ENABLE_RAPID_JSON_API
/*PROTECTED REGION END*/

#ifdef ENABLE_RAPID_JSON_API
        #include <rapidjson/document.h>
    #else // ENABLE_RAPID_JSON_API
#include <jsoncpp/json/json.h>
#endif // ENABLE_RAPID_JSON_API

using namespace ::nevonex::common::utils;

/*PROTECTED REGION ID(WebSocketEndPoint_additional_headers) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

namespace AppMain
{
    namespace web
    {

        class WebSocketEndPoint: public virtual ::ecore::EObject,
                public ::nevonex::web::server::WebSocketRouteFactory
        {
            /*PROTECTED REGION ID(WebSocketEndPoint_commonSection) START*/
            // Please, enable the protected region if you add manually written code.
            // To do this, add the keyword ENABLED before START.
            /*PROTECTED REGION END*/

        public:
            WebSocketEndPoint();

            virtual ~WebSocketEndPoint();

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

            /*PROTECTED REGION ID(WebSocketEndPoint) START*/
            // Please, enable the protected region if you add manually written code.
            // To do this, add the keyword ENABLED before START.
            /*PROTECTED REGION END*/

        public:
            static std::shared_ptr< WebSocketEndPoint > getInstance();

            void onWebSocketMessage(const std::string &message);
            void publishMessage(const std::string &message);
            virtual void disconnect() override;

#ifdef ENABLE_RAPID_JSON_API
        void onWebSocketJsonMessage(rapidjson::Document &outputJsonObject);
        void publishMessage(const rapidjson::Document &jsonMessage);
    #else // ENABLE_RAPID_JSON_API        
            void onWebSocketJsonMessage(Json::Value &jsonMessage);
            void publishMessage(const Json::Value &jsonMessage);
#endif // ENABLE_RAPID_JSON_API   

            void onDisconnect(const std::string &message);

            virtual ::nevonex::web::server::WebSocketRoute* createWebsocketRoute(
                    const Poco::Net::HTTPServerRequest &request) override;
        protected:
            static std::shared_ptr< WebSocketEndPoint > s_holder;
        private:
            ::nevonex::web::server::MessageQueueWebsocket *websocket;

        protected:
            WebSocketEndPoint_ptr _this()
            {
                return WebSocketEndPoint_ptr(this);
            }

        private:
            // Attributes

            // References

            ::AppMain::KSAS_ptr m_kSAS;

            /*PROTECTED REGION ID(WebSocketEndPoint_privateSection) START*/
            // Please, enable the protected region if you add manually written code.
            // To do this, add the keyword ENABLED before START.
            /*PROTECTED REGION END*/
        };

    } // web
} // AppMain

#endif // APPMAIN_WEB_WEBSOCKETENDPOINT_HPP

