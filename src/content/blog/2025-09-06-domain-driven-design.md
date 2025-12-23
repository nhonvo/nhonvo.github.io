---
title: "Domain Driven Design (DDD) Fundamentals"
description: "Explain the core concepts of DDD, including entities, value objects, aggregates, and bounded contexts."
pubDate: "9 6 2025"
published: true
tags:
  [
    ".NET",
    "C#",
    "Architecture",
    "DDD",
    "Design Patterns",
    "Clean Architecture",
    "Bounded Context",
    "Aggregate Root",
    "Domain Logic",
    "Entity",
    "Value Object",
  ]
---

## Mind Map Summary

- **Domain-Driven Design (DDD)**: An approach to software development that focuses on modeling the software to match the real-world domain it represents.
  - **Strategic DDD (The Big Picture)**
    - **Ubiquitous Language**: A shared, common language developed by developers and domain experts. It's used in all communication and in the code itself.
    - **Bounded Context**: A specific boundary within the application domain where a particular domain model is consistent and valid. For example, the meaning of "Product" might be different in the "Sales" context vs. the "Shipping" context.
  - **Tactical DDD (The Building Blocks)**
    - **Entity**: An object defined by its **identity**, not its attributes. It is mutable and has a life cycle.
      - _Example_: A `Customer` with a unique `CustomerId`.
    - **Value Object**: An object defined by its **attributes**. It is immutable and has no identity.
      - _Example_: An `Address` (Street, City, ZipCode). Two addresses are the same if all their attributes are the same.
    - **Aggregate**: A cluster of related entities and value objects that are treated as a single unit for data consistency.
      - **Aggregate Root**: The single entry point to the aggregate. It's the only object that external code is allowed to hold a reference to. It enforces the aggregate's invariants (consistency rules).
      - _Example_: An `Order` is the aggregate root, and `OrderLineItem` is an entity within that aggregate. You wouldn't modify a line item directly; you would go through the `Order` object.

## Core Concepts

### 1. Strategic DDD

- **Ubiquitous Language**: This is the foundation of DDD. The goal is to eliminate ambiguity and translation errors between business experts and the development team. If the business calls it a "Customer," the class in the code should be named `Customer`, not `Client` or `User`. This shared language is used everywhere—in conversations, diagrams, and code.
- **Bounded Context**: Large domains are too complex to model as a single unit. A Bounded Context is a boundary that you draw around a specific part of the domain. Inside this boundary, a model is internally consistent. For example, in a "Sales" context, a `Product` might have a price and sales history. In a "Shipping" context, the same `Product` might only have a weight, dimensions, and hazardous material flag. They are different models of the same real-world concept, each valid within its own context.

### 2. Tactical DDD

- **Entity**: An Entity is an object that has a unique identity that remains the same throughout its lifecycle, even if its attributes change. Think of a person: their name or address can change, but their unique identity (represented by a primary key or a GUID) does not. Entities are responsible for their own behavior and enforcing their own rules.
- **Value Object**: A Value Object is an object that describes a characteristic. It is defined solely by its attributes. For example, a `Money` object with an `Amount` of 100 and a `Currency` of "USD" is identical to any other `Money` object with the same amount and currency. They are interchangeable. Value Objects should always be **immutable**—to change one, you create a new instance with the new values.
- **Aggregate and Aggregate Root**: An Aggregate is a consistency boundary. It's a collection of domain objects (Entities and Value Objects) that should be treated as a single unit. The Aggregate Root is the main entity of the aggregate, and it is the only member that outside objects are allowed to interact with. It is responsible for ensuring that the entire aggregate is always in a valid state. For example, when adding an item to an order, you would call `order.AddLineItem(...)`. The `Order` (the Aggregate Root) would contain the logic to validate the item and ensure the total price is updated correctly.

## Practice Exercise

Model a `Customer` entity and an `Address` value object in C#. The `Address` class should be immutable. The `Customer` should have a method like `UpdateAddress(newAddress)` that enforces validation rules. Explain why `Address` is a good candidate for a value object.

## Answer (DDD Implementation in C#)

### 1. The Value Object: Address

It is immutable and defined by its properties.

```csharp
public class Address
{
    public string Street { get; private set; }
    public string City { get; private set; }
    public string ZipCode { get; private set; }

    public Address(string street, string city, string zipCode)
    {
        // Validation can happen here
        if (string.IsNullOrWhiteSpace(street)) throw new ArgumentNullException(nameof(street));
        if (string.IsNullOrWhiteSpace(city)) throw new ArgumentNullException(nameof(city));
        if (string.IsNullOrWhiteSpace(zipCode)) throw new ArgumentNullException(nameof(zipCode));

        Street = street;
        City = city;
        ZipCode = zipCode;
    }

    // Equality is based on the values of the properties, not on identity.
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
            return false;

        Address other = (Address)obj;
        return Street == other.Street && City == other.City && ZipCode == other.ZipCode;
    }

    public override int GetHashCode()
    {
        return HashCode.Combine(Street, City, ZipCode);
    }
}
```

### 2. The Entity: Customer

It has a unique identity (Id) and is mutable.

```csharp
public class Customer
{
    public Guid Id { get; private set; }
    public string Name { get; private set; }
    public Address ShippingAddress { get; private set; }

    public Customer(string name, Address initialAddress)
    {
        Id = Guid.NewGuid();
        Name = name;
        ShippingAddress = initialAddress;
    }

    // Behavior is encapsulated within the entity.
    public void UpdateAddress(Address newAddress)
    {
        if (newAddress == null)
            throw new ArgumentNullException(nameof(newAddress));

        // Enforce a business rule: we don't ship to a specific zip code.
        if (newAddress.ZipCode == "99999")
            throw new InvalidOperationException("Cannot ship to this zip code.");

        ShippingAddress = newAddress;
    }
}
```

### Explanation: Why `Address` is a Value Object

`Address` is a perfect candidate for a Value Object for several key reasons:

1. **No Conceptual Identity**: An address does not have a unique identity that needs to be tracked over time. Its entire meaning is defined by its descriptive attributes (street, city, zip). If you move from "123 Main St" to "456 Oak Ave," you don't "change" the address; you replace the old address value with a new one.
2. **Equality is Based on Attributes**: Two `Address` objects are considered equal if and only if their street, city, and zip code are all the same. We don't care if they are different instances in memory. This is fundamentally different from an `Entity`, where two `Customer` objects are different even if they have the same name, because they have different `Id`s.
3. **Immutability**: Making the `Address` object immutable simplifies the system. It means an address cannot be changed once it's created. This prevents bugs where a change to a shared `Address` object accidentally affects multiple entities that reference it. To change a customer's address, you must create a _new_ `Address` instance and assign it to the customer. This makes the code safer and easier to reason about.
