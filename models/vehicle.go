package models

type Vehicle struct {
    ID           string  `json:"id"`
    Name         string  `json:"name"`
    Description  string  `json:"description"`
    VehicleClass string  `json:"vehicle_class"`
    Length       string  `json:"length"`
    Image        *string `json:"image,omitempty"`
    Pilot        *Person `json:"pilot,omitempty"`
    Films        []Film  `json:"films,omitempty"`
}
