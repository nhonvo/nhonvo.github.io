---
title: "Saga Pattern for Distributed Transactions"
description: "Explain how the Saga pattern manages data consistency across microservices without using two-phase commit. Discuss the Choreography vs. Orchestration approaches."
pubDate: "Sep 07 2025"
published: true
tags: ["Software Design & Architecture", "Microservices", "Distributed Systems", "Saga Pattern", "Data Consistency"]
---

### Mind Map Summary

- **Topic**: Saga Pattern
- **Definition**: A sequence of local transactions where each transaction updates data within a single service and publishes an event or message that triggers the next transaction in the saga. If a transaction fails, the saga executes compensating transactions to undo the preceding transactions.
- **Key Concepts**:
    - **Local Transaction**: A standard ACID transaction performed by a single microservice.
    - **Compensating Transaction**: An operation that reverses the effect of a previous transaction.
    - **Choreography**: Each service in the saga subscribes to events from other services and acts accordingly. There is no central coordinator.
    - **Orchestration**: A central orchestrator (the saga orchestrator) tells the participants what to do. The orchestrator communicates with each service directly.
- **Pros**:
    - **Maintains Data Consistency**: Ensures data consistency across services without tight coupling.
    - **No Distributed Locks**: Avoids the need for distributed locks, which can be a performance bottleneck.
    - **Improved Fault Tolerance**: Sagas are designed to handle failures gracefully.
- **Cons**:
    - **Complex to Implement**: The logic for sagas, especially compensating transactions, can be complex.
    - **Eventual Consistency**: Data is eventually consistent, which may not be suitable for all use cases.
    - **Debugging Challenges**: Debugging a distributed saga can be difficult.

### Practice Exercise

Whiteboard the Saga pattern for a 'trip booking' system involving three services: Flights, Hotels, and Payments. Show the sequence of events and compensating transactions for both a successful booking and a failure scenario (e.g., the hotel booking fails).

### Answer

#### Scenario: Successful Trip Booking (Orchestration)

1.  **Client -> Trip Booking Orchestrator**: `CreateTripRequest`
2.  **Trip Booking Orchestrator -> Flight Service**: `BookFlightCommand`
3.  **Flight Service**: Books the flight, saves to its DB, and replies to the orchestrator.
4.  **Trip Booking Orchestrator -> Hotel Service**: `BookHotelCommand`
5.  **Hotel Service**: Books the hotel, saves to its DB, and replies to the orchestrator.
6.  **Trip Booking Orchestrator -> Payment Service**: `ProcessPaymentCommand`
7.  **Payment Service**: Processes the payment, saves to its DB, and replies to the orchestrator.
8.  **Trip Booking Orchestrator**: Marks the trip as booked and replies to the client.

#### Scenario: Hotel Booking Fails (Orchestration with Compensation)

1.  **Client -> Trip Booking Orchestrator**: `CreateTripRequest`
2.  **Trip Booking Orchestrator -> Flight Service**: `BookFlightCommand`
3.  **Flight Service**: Books the flight, saves to its DB, and replies to the orchestrator.
4.  **Trip Booking Orchestrator -> Hotel Service**: `BookHotelCommand`
5.  **Hotel Service**: Fails to book the hotel and replies with an error.
6.  **Trip Booking Orchestrator**: Initiates compensation.
7.  **Trip Booking Orchestrator -> Flight Service**: `CancelFlightCommand` (Compensating Transaction)
8.  **Flight Service**: Cancels the flight, updates its DB, and replies to the orchestrator.
9.  **Trip Booking Orcheator**: Marks the trip as failed and replies to the client.
