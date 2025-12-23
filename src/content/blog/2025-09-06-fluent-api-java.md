---
title: "JPA Configuration: Annotations vs. XML Mapping"
description: "Choosing the right way to map Java entities: comparing the modern Annotation-driven approach with traditional XML and programmatic configuration."
pubDate: "9 6 2025"
published: true
tags: ["java", "jpa", "hibernate", "configuration", "orm", "backend"]
---

### The Evolution of Mapping

Mapping Java classes to database tables has evolved from verbose XML files to concise annotations. While annotations are now the industry standard, understanding XML mapping remains crucial for legacy systems and "clean domain" architectures.

### Core Concepts

#### 1. Annotation-based Mapping

Mapping meta-data is stored directly within the Java code using `@Entity`, `@Table`, `@Column`, etc.

- **Pros**: Easy to read, developer-friendly, co-located with code.
- **Cons**: "Pollutes" Domain entities with persistence concerns.

#### 2. XML-based Mapping (`orm.xml`)

Mapping data is defined in an external XML file (usually `META-INF/orm.xml`).

- **Pros**: Keeps Domain classes pure (no imports from `javax.persistence`), allows overriding mapping without recompiling.
- **Cons**: Verbose, fragile (string-based references to classes/fields), harder to maintain.

---

### Practice Exercise: Decoupling with Programmatic Config

We will take a "God Class" tied to annotations and refactor it to use a cleaner configuration approach (using Hibernate's `MetadataSources` or Spring's `LocalContainerEntityManagerFactoryBean`).

#### The Standard Way (Annotations)

```java
@Entity
public class User {
    @Id @GeneratedValue private Long id;
    @Column(nullable = false) private String email;
}
```

#### Refactoring to a Clean Domain

If you want to keep your `User` class free of JPA annotations, you can define the mapping in `orm.xml`:

```xml
<entity-mappings xmlns="http://xmlns.jcp.org/xml/ns/persistence/orm" version="2.1">
    <entity class="com.example.domain.User">
        <table name="app_users"/>
        <attributes>
            <id name="id">
                <generated-value strategy="IDENTITY"/>
            </id>
            <basic name="email">
                <column nullable="false" unique="true"/>
            </basic>
        </attributes>
    </entity>
</entity-mappings>
```

#### Programmatic Override (Spring Boot)

In Spring, you can customize the configuration via a `HibernatePropertiesCustomizer`:

```java
@Configuration
public class DatabaseConfig {
    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer() {
        return hibernateProperties -> {
            hibernateProperties.put("hibernate.hbm2ddl.auto", "validate");
            // Add custom physical naming strategies here
        };
    }
}
```

---

### Why This Works

- **Separation of Concerns**: XML/Programmatic mapping satisfies the **Clean Architecture** rule that the core domain should not depend on external frameworks.
- **Flexibility**: Annotations can define the _default_ behavior, while XML can _override_ it for specific environments (e.g., changing table names for different DB vendors without changing code).

### When to choose what?

- **Small to Medium Apps**: Stick to **Annotations**. The speed of development and readability outweighs the "pollution".
- **Enterprise/DDD Apps**: Consider **XML** for your core Aggregate Roots to keep them framework-agnostic.

### Summary

Mapping is more than just linking fields to columns; it's an architectural decision. Whether you choose the convenience of Annotations or the purity of XML, consistency across the codebase is key.
