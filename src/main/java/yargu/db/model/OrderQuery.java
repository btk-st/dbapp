package yargu.db.model;

import java.math.BigDecimal;

public class OrderQuery {
    private HouseType houseType;
    private Region  region;
    private Integer areaFrom;
    private Integer areaTo;
    private Integer kitchenAreaFrom;
    private Integer kitchenAreaTo;
    private Integer floorFrom;
    private Integer floorTo;
    private Integer yearOfConstructionFrom;
    private Integer yearOfConstructionTo;
    private Integer ceilingHeightFrom;
    private Integer ceilingHeightTo;

    private BigDecimal rublePriceFrom;
    private BigDecimal rublePriceTo;
    private BigDecimal dollarPriceFrom;
    private BigDecimal dollarPriceTo;


    private Boolean hasGarbageChute;
    private Boolean hasUndergroundParking;
    private Boolean hasSwimmingPool;
    private Boolean hasBalcony;

    private String  comment;


    public HouseType getHouseType() {
        return houseType;
    }

    public void setHouseType(HouseType houseType) {
        this.houseType = houseType;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Integer getAreaFrom() {
        return areaFrom;
    }

    public void setAreaFrom(Integer areaFrom) {
        this.areaFrom = areaFrom;
    }

    public Integer getAreaTo() {
        return areaTo;
    }

    public void setAreaTo(Integer areaTo) {
        this.areaTo = areaTo;
    }

    public Integer getKitchenAreaFrom() {
        return kitchenAreaFrom;
    }

    public void setKitchenAreaFrom(Integer kitchenAreaFrom) {
        this.kitchenAreaFrom = kitchenAreaFrom;
    }

    public Integer getKitchenAreaTo() {
        return kitchenAreaTo;
    }

    public void setKitchenAreaTo(Integer kitchenAreaTo) {
        this.kitchenAreaTo = kitchenAreaTo;
    }

    public Integer getFloorFrom() {
        return floorFrom;
    }

    public void setFloorFrom(Integer floorFrom) {
        this.floorFrom = floorFrom;
    }

    public Integer getFloorTo() {
        return floorTo;
    }

    public void setFloorTo(Integer floorTo) {
        this.floorTo = floorTo;
    }

    public Integer getYearOfConstructionFrom() {
        return yearOfConstructionFrom;
    }

    public void setYearOfConstructionFrom(Integer yearOfConstructionFrom) {
        this.yearOfConstructionFrom = yearOfConstructionFrom;
    }

    public Integer getYearOfConstructionTo() {
        return yearOfConstructionTo;
    }

    public void setYearOfConstructionTo(Integer yearOfConstructionTo) {
        this.yearOfConstructionTo = yearOfConstructionTo;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean getHasGarbageChute() {
        return hasGarbageChute;
    }

    public void setHasGarbageChute(Boolean hasGarbageChute) {
        this.hasGarbageChute = hasGarbageChute;
    }

    public Boolean getHasUndergroundParking() {
        return hasUndergroundParking;
    }

    public void setHasUndergroundParking(Boolean hasUndergroundParking) {
        this.hasUndergroundParking = hasUndergroundParking;
    }

    public Boolean getHasSwimmingPool() {
        return hasSwimmingPool;
    }

    public void setHasSwimmingPool(Boolean hasSwimmingPool) {
        this.hasSwimmingPool = hasSwimmingPool;
    }

    public Integer getCeilingHeightFrom() {
        return ceilingHeightFrom;
    }

    public void setCeilingHeightFrom(Integer ceilingHeightFrom) {
        this.ceilingHeightFrom = ceilingHeightFrom;
    }

    public Integer getCeilingHeightTo() {
        return ceilingHeightTo;
    }

    public void setCeilingHeightTo(Integer ceilingHeightTo) {
        this.ceilingHeightTo = ceilingHeightTo;
    }

    public Boolean getHasBalcony() {
        return hasBalcony;
    }

    public void setHasBalcony(Boolean hasBalcony) {
        this.hasBalcony = hasBalcony;
    }

    public BigDecimal getRublePriceFrom() {
        return rublePriceFrom;
    }

    public void setRublePriceFrom(BigDecimal rublePriceFrom) {
        this.rublePriceFrom = rublePriceFrom;
    }

    public BigDecimal getRublePriceTo() {
        return rublePriceTo;
    }

    public void setRublePriceTo(BigDecimal rublePriceTo) {
        this.rublePriceTo = rublePriceTo;
    }

    public BigDecimal getDollarPriceFrom() {
        return dollarPriceFrom;
    }

    public void setDollarPriceFrom(BigDecimal dollarPriceFrom) {
        this.dollarPriceFrom = dollarPriceFrom;
    }

    public BigDecimal getDollarPriceTo() {
        return dollarPriceTo;
    }

    public void setDollarPriceTo(BigDecimal dollarPriceTo) {
        this.dollarPriceTo = dollarPriceTo;
    }
}
