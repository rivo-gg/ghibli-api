package models

type Person struct {
    ID        string   `json:"id"`
    Name      string   `json:"name"`
    Gender    string   `json:"gender"`
    Age       string   `json:"age"`
    EyeColor  string   `json:"eye_color"`
    HairColor string   `json:"hair_color"`
    Films     []Film   `json:"films,omitempty"`
    Species   *Species `json:"species,omitempty"`
    Vehicles  []Vehicle `json:"vehicles,omitempty"`
    Locations []Location `json:"locations,omitempty"`
}