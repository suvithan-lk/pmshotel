# Module Architecture

## Experience applications

-   Public website
-   PMS back office
-   POS and kitchen
-   Reporting

## Hotel business modules

-   Identity and access
-   Property configuration
-   Availability and rates
-   Reservations
-   Front office and stays
-   Folios and payments

## Operational and revenue modules

-   Guests and CRM
-   Housekeeping
-   Maintenance
-   Restaurant and POS
-   Facilities
-   Inventory and procurement

## Platform services

-   Audit and compliance
-   Distribution adapters
-   Payments and accounting
-   Reporting and AI
-   Jobs and observability

## Module ownership

  -----------------------------------------------------------------------
  Module                  Owns                    Key output
  ----------------------- ----------------------- -----------------------
  Identity and access     Users, roles,           Authorized actor
                          permissions, scope,     context and audit
                          sessions, approval      identity
                          policy                  

  Property configuration  Rooms, types, outlets,  Valid configuration
                          taxes, services,        
                          policies, business date 

  Availability and rates  Inventory, rates,       Sellable offers and
                          restrictions, holds,    allocation decisions
                          quotes                  

  Reservations            Reservation, guest      Confirmed demand and
                          snapshot, source,       arrival records
                          guarantee, lifecycle    

  Front office/stays      Assignment, check-in,   Active stay and
                          move, extension,        occupancy state
                          checkout                

  Folios/payments         Accounts, ledger        Auditable guest balance
                          entries, routing,       and financial events
                          tenders, invoices       

  Housekeeping            Cleaning tasks,         Room readiness
                          inspections,            contribution
                          housekeeping state      

  Maintenance             Assets, work orders,    Maintenance
                          blocking conditions     availability
                                                  contribution

  Restaurant/POS          Outlet, menu, order,    Settled sales and
                          KOT, tender, shift      linked room charges

  Facilities              Banquet/pool/bicycle    Capacity commitment and
                          booking or usage        charge instruction

  Inventory/procurement   Items, locations, stock Stock-on-hand and
                          movements, suppliers,   valuation inputs
                          purchasing              

  Guests/CRM              Guest identity,         Approved customer
                          preferences, consent,   context
                          communications          

  Reporting/AI            Read models,            Explainable decision
                          dashboards, alerts,     support
                          recommendations         
  -----------------------------------------------------------------------
