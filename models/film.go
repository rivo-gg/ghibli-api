package models

type Film struct {
    ID                    string    `json:"id"`
    Title                 string    `json:"title"`
    OriginalTitle         *string   `json:"original_title,omitempty"`
    OriginalTitleRomanised *string   `json:"original_title_romanised,omitempty"`
    Image                 *string   `json:"image,omitempty"`
    MovieBanner           *string   `json:"movie_banner,omitempty"`
    Description           string    `json:"description"`
    Director              string    `json:"director"`
    Producer              string    `json:"producer"`
    ReleaseDate           string    `json:"release_date"`
    RTScore               string    `json:"rt_score"`
    RunningTime           *string   `json:"running_time,omitempty"`
    People                []Person  `json:"people,omitempty"`
    Species               []Species `json:"species,omitempty"`
    Locations             []Location `json:"locations,omitempty"`
    Vehicles              []Vehicle `json:"vehicles,omitempty"`
}