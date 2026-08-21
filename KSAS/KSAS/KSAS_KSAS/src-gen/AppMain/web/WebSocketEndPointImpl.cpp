/*
 * AppMain/web/WebSocketEndPointImpl.cpp
 * Copyright (c) Robert Bosch GmbH. All rights reserved.
 */

#include "WebSocketEndPoint.hpp"
#include <stdexcept>

#include <AppMain/KSAS.hpp>
#include <ecore/EObject.hpp>
#include <ecore/EClass.hpp>
#include <ecore/EStructuralFeature.hpp>
#include <ecore/EReference.hpp>
#include <ecore/EOperation.hpp>
#include <ecorecpp/mapping.hpp>

#include <nevonex-fcal-platform/log/Logger.hpp>

/*PROTECTED REGION ID(WebSocketEndPointImpl.cpp) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

#include <rapidjson/writer.h>
#include <rapidjson/error/en.h>
#include <rapidjson/document.h>
#include <rapidjson/stringbuffer.h>

#include <boost/log/core.hpp>
#include <boost/exception/diagnostic_information.hpp>
/*PROTECTED REGION ID(WebSocketEndPoint_additional_headers_Impl) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

using namespace ::AppMain::web;
using namespace ::nevonex::log;

/*PROTECTED REGION ID(WebSocketEndPointImpl_Methods) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

std::shared_ptr< WebSocketEndPoint > WebSocketEndPoint::s_holder = nullptr;

std::shared_ptr< WebSocketEndPoint > WebSocketEndPoint::getInstance()
{
    if (!s_holder.get())
        s_holder = std::make_shared< WebSocketEndPoint >();

    return s_holder;
}

#ifdef ENABLE_RAPID_JSON_API
void WebSocketEndPoint::onWebSocketJsonMessage(rapidjson::Document &jsonMessage)
{
	/*PROTECTED REGION ID(WebSocketEndPointonWebSocketRapidJsonMessage_method) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
	/*PROTECTED REGION END*/
}

void WebSocketEndPoint::publishMessage(const rapidjson::Document &jsonMessage)
{
    /*PROTECTED REGION ID(WebSocketEndPoint_publishMessage_rapidjson) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
     ::rapidjson::StringBuffer stringBuffer;
     CommonUtils::convertJsonToString(jsonMessage, stringBuffer);
     std::string stringFromJson = std::string(stringBuffer.GetString());
    
    /*PROTECTED REGION END*/
    this->publishMessage(stringFromJson);
}

#else // ENABLE_RAPID_JSON_API
void WebSocketEndPoint::onWebSocketJsonMessage(Json::Value &jsonMessage)
{
    /*PROTECTED REGION ID(WebSocketEndPointonWebSocketJsonMessage_method) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

void WebSocketEndPoint::publishMessage(const Json::Value &jsonMessage)
{
    /*PROTECTED REGION ID(WebSocketEndPoint_publishMessage_json) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    Json::StreamWriterBuilder builder;
    builder["indentation"] = ""; // If you want whitespace-less output

    /*PROTECTED REGION END*/
    this->publishMessage(Json::writeString(builder, jsonMessage));
}
#endif // ENABLE_RAPID_JSON_API

void WebSocketEndPoint::onWebSocketMessage(const std::string &message)
{
    NEVONEX_LOG(SeverityLevel::debug) << "Websocket message received. Message:"
            << message;
#ifdef ENABLE_RAPID_JSON_API
        using namespace ::rapidjson;
        Document outputJsonObject(kObjectType);
        ParseResult parsingSuccessful = outputJsonObject.Parse(message.c_str());
        if (parsingSuccessful)
        {
            onWebSocketJsonMessage(outputJsonObject);
            return;
        }
        NEVONEX_LOG(SeverityLevel::error) << "onWebSocketMessage: Failed to parse JSON message" <<  ::rapidjson::GetParseError_En(parsingSuccessful.Code());
    
    /*PROTECTED REGION ID(WebSocketEndPoint_onWebSocketMessage_string_rapidjson) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
   #else // ENABLE_RAPID_JSON_API
    Json::CharReaderBuilder builder;
    builder["collectComments"] = false;

    std::string errs;
    Json::Value jsonMessage;
    auto payloadMessage = std::istringstream(message);
    bool parsingSuccessful = Json::parseFromStream(builder, payloadMessage,
            &jsonMessage, &errs);
    if (parsingSuccessful)
    {
        onWebSocketJsonMessage(jsonMessage);
        return;
    }
    NEVONEX_LOG(SeverityLevel::error)
            << "onWebSocketMessage: Failed to parse JSON message" << errs;

    /*PROTECTED REGION ID(WebSocketEndPoint_onWebSocketMessage_string_jsoncpp) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
#endif // ENABLE_RAPID_JSON_API

}

void WebSocketEndPoint::publishMessage(const std::string &message)
{
    /*PROTECTED REGION ID(WebSocketEndPoint_publishMessage_string_method) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    if (websocket)
    {
        NEVONEX_LOG(SeverityLevel::debug)
                << "Websocket publish message. Message:" << message;
        websocket->publishMessage(message);
    }

    /*PROTECTED REGION END*/
}

::nevonex::web::server::WebSocketRoute* WebSocketEndPoint::createWebsocketRoute(
        const Poco::Net::HTTPServerRequest &request)
{
    /*PROTECTED REGION ID(WebSocketEndPoint_createWebsocketRoute_method) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    using namespace ::nevonex::web::server;

    if (websocket != nullptr)
    {
        NEVONEX_LOG(SeverityLevel::warning)
                << "Only one client is supported. Attempting to close this existing connection.";
        websocket->close();
    }

    websocket = new MessageQueueWebsocket();
    using std::placeholders::_1;
    websocket->set_message_handler(
            std::bind(&WebSocketEndPoint::onWebSocketMessage, this, _1));
    websocket->set_disconnected_handler(
            std::bind(&WebSocketEndPoint::onDisconnect, this, _1));
    return websocket;

    /*PROTECTED REGION END*/
}

void WebSocketEndPoint::onDisconnect(const std::string &message)
{
    NEVONEX_LOG(SeverityLevel::debug) << message;
    websocket = nullptr;
}

void WebSocketEndPoint::disconnect()
{
    NEVONEX_LOG(SeverityLevel::info)
            << "The feature is going to be stopped, so web socket client is getting disconnected.";
    websocket->close();
    websocket = nullptr;
}

void WebSocketEndPoint::_initialize()
{
    // Supertypes

    // References

    /*PROTECTED REGION ID(WebSocketEndPointImpl__initialize) START*/
    // Please, enable the protected region if you add manually written code.
    // To do this, add the keyword ENABLED before START.
    /*PROTECTED REGION END*/
}

// Operations from Parent(s)

// Operations

/*PROTECTED REGION ID(WebSocketEndPointImpl_MethodsEnd) START*/
// Please, enable the protected region if you add manually written code.
// To do this, add the keyword ENABLED before START.
/*PROTECTED REGION END*/

