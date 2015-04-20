library(irr)
library(jsonlite)

# Example using numeric categories. 
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



# Example using nominal categories. 

diagnoses1 <-
fromJSON('{"A":"malignant","B":"benign","C":"benign","D":"malignant","E":"malignant","F":"malignant","G":"benign","H":"benign","I":"benign","J":"benign","K":"malignant","L":"benign","M":"inconclusive","N":"inconclusive","O":"inconclusive","P":"benign","Q":"benign","R":"malignant","S":"benign","T":"benign","U":"malignant","V":"malignant","W":"inconclusive","X":"benign","Y":"inconclusive","Z":"inconclusive","AA":"benign","BB":"benign","CC":"malignant","DD":"benign","EE":"benign"}')

diagnoses2 <-
fromJSON('{"A":"malignant","B":"benign","C":"benign","D":"malignant","E":"benign","F":"malignant","G":"benign","H":"benign","I":"malignant","J":"benign","K":"malignant","L":"benign","M":"inconclusive","N":"inconclusive","O":"inconclusive","P":"benign","Q":"benign","R":"benign","S":"benign","T":"benign","U":"malignant","V":"benign","W":"inconclusive","X":"benign","Y":"inconclusive","Z":"inconclusive","AA":"benign","BB":"benign","CC":"malignant","DD":"benign","EE":"benign"}')


diagDat1 <- as.data.frame(cbind(diagnoses1))
diagDat2 <- as.data.frame(cbind(diagnoses2))

tot <- merge(diagDat1, diagDat2, by="row.names")
tot$diagnoses1 <- unlist(tot$diagnoses1)
tot$diagnoses2 <- unlist(tot$diagnoses2)

d <- tot[,c(2,3)]

kap <- kappa2(d, "unweighted")
kap

