library(irr)
library(jsonlite)

rev1 <- fromJSON('{"Rambo":5,"Point Break":3,"Speed":2,"Aliens":5,"Red Dawn":3,"Blond on Blond":4,"Terminator":3}')
rev2 <- fromJSON('{"Terminator":5,"Speed":3,"Aliens":5,"Point Break":2,"Red Dawn":2,"Blond on Blond":1,"Rambo":3}')

rev1c <- cbind(rev1)
rev2c <- cbind(rev2)

dat1 <- as.data.frame(rev1c)
dat2 <- as.data.frame(rev2c)

total <- merge(dat1, dat2, by="row.names")
total$rev1 <- unlist(total$rev1)
total$rev2 <- unlist(total$rev2)

data <- total[,c(2,3)]

kU <- kappa2(data, "unweighted")
kL <- kappa2(data, "equal")
kS <- kappa2(data, "squared")

