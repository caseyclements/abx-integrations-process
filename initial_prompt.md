I would like to create an html containing the process steps for a successful SSDLC integration into MongoDB. It will contains nodes: with {team, features, dependencies}. Some can be done in parallel, many in line. The teams are:

PM (Product Manager)
ENG-PY (Python specialist)
ENG-TS (Typescript specialist)
MGR (Senior Manager)
MKT (Any marketing function)
GTM (Coordinates w partners)
ENG-PA (Engineer from Partners)
BR (Build Relations team)

There are also assets, like 
docs:
*PD (product description) - owned by PM
*SCP (requirements at a lower level)  - PM together with ENG*
*DES: (Optional. If design is complex and requires specialists, this will be signed off)
* LRA (Launch Readiness Assessment) owned by PM, Technical aspects authored by ENG, signed off by MGR

times:
Est: Conservative number of weeks to complete

dates:
t0: When PD or SCP is available
tStart: date engineering begins
tEnd: target date engineering ends
tLaunch: date the product is announced to the world.

