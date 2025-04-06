package models

type Location struct {
    ID           string   `json:"id"`
    Name         string   `json:"name"`
    Climate      string   `json:"climate"`
    Terrain      string   `json:"terrain"`
    SurfaceWater string   `json:"surface_water"`
    Residents    []Person `json:"residents,omitempty"`
    Films        []Film   `json:"films,omitempty"`
}