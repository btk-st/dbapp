package yargu.db.model;

import javax.persistence.*;

@Entity
@Table(name = "houses")
public class House {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Enumerated(EnumType.STRING)
    @Column(name = "region")
    private Region region;

    @Column(name = "flat_number")
    private Integer flatNumber;

    @Enumerated(EnumType.STRING)
    @Column(name = "type")
    private HouseType houseType;

    @Column(name = "area")
    private Integer area;

    @Column(name = "floor")
    private Integer floor;

    @Column(name = "floors_count")
    private Integer floorsCount;

    @Column(name = "year_of_construction")
    private Integer yearOfConstruction;

    @Column(name = "comment")
    private String comment;

    @Column(name = "has_garbage_chute")
    private Boolean hasGarbageChute;

    @Column(name = "kitchen_area")
    private Integer kitchenArea;

    @Column(name = "has_underground_parking")
    private Boolean hasUndergroundParking;

    @Column(name="has_swimming_pool")
    private Boolean hasSwimmingPool;

    @Column(name = "ceiling_height")
    private Integer ceilingHeight;

    @Column(name = "has_balcony")
    private Boolean hasBalcony;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Region getRegion() {
        return region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Integer getFlatNumber() {
        return flatNumber;
    }

    public void setFlatNumber(Integer flatNumber) {
        this.flatNumber = flatNumber;
    }

    public HouseType getHouseType() {
        return houseType;
    }

    public void setHouseType(HouseType houseType) {
        this.houseType = houseType;
    }

    public Integer getArea() {
        return area;
    }

    public void setArea(Integer area) {
        this.area = area;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public Integer getFloorsCount() {
        return floorsCount;
    }

    public void setFloorsCount(Integer floorsCount) {
        this.floorsCount = floorsCount;
    }

    public Integer getYearOfConstruction() {
        return yearOfConstruction;
    }

    public void setYearOfConstruction(Integer yearOfConstruction) {
        this.yearOfConstruction = yearOfConstruction;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Boolean isHasGarbageChute() {
        return hasGarbageChute;
    }

    public void setHasGarbageChute(Boolean hasGarbageChute) {
        this.hasGarbageChute = hasGarbageChute;
    }

    public Integer getKitchenArea() {
        return kitchenArea;
    }

    public void setKitchenArea(Integer kitchen_area) {
        this.kitchenArea = kitchen_area;
    }

    public Boolean isHasUndergroundParking() {
        return hasUndergroundParking;
    }

    public void setHasUndergroundParking(Boolean hasUndergroundParking) {
        this.hasUndergroundParking = hasUndergroundParking;
    }

    public Boolean isHasSwimmingPool() {
        return hasSwimmingPool;
    }

    public void setHasSwimmingPool(Boolean hasSwimmingPool) {
        this.hasSwimmingPool = hasSwimmingPool;
    }

    public Integer getCeilingHeight() {
        return ceilingHeight;
    }

    public void setCeilingHeight(Integer ceilingHeight) {
        this.ceilingHeight = ceilingHeight;
    }

    public Boolean isHasBalcony() {
        return hasBalcony;
    }

    public void setHasBalcony(Boolean hasBalcony) {
        this.hasBalcony = hasBalcony;
    }
}
