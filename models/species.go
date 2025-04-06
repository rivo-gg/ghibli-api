package models

type Species struct {
    ID             string   `json:"id"`
    Name           string   `json:"name"`
    Classification string   `json:"classification"`
    EyeColors      string   `json:"eye_colors"`
    HairColors     string   `json:"hair_colors"`
    People         []Person `json:"people,omitempty"`
    Films          []Film   `json:"films,omitempty"`
}