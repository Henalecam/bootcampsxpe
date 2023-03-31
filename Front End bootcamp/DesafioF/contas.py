import math
import json

origin_latitude = float(input('Digite a latitude de origem: '))
origin_longitude = float(input('Digite a longitude de origem: '))
destination_latitude = float(input('Digite a latitude de destino: '))
destination_longitude = float(input('Digite a longitude de destino: '))

def degrees_to_radians(degrees):
    return degrees * math.pi / 180

def get_distance(origin_latitude, origin_longitude, destination_latitude, destination_longitude):
    EARTH_RADIUS = 6371.071 # Earth
    diff_latitude_radians = degrees_to_radians(destination_latitude - origin_latitude)
    diff_longitude_radians = degrees_to_radians(destination_longitude - origin_longitude)
    origin_latitude_radians = degrees_to_radians(origin_latitude)
    destination_latitude_radians = degrees_to_radians(destination_latitude)
    km_distance = 2 * EARTH_RADIUS * math.asin(math.sqrt(math.sin(diff_latitude_radians / 2) * math.sin(diff_latitude_radians / 2) + math.cos(origin_latitude_radians) * math.cos(destination_latitude_radians) * math.sin(diff_longitude_radians / 2) * math.sin(diff_longitude_radians / 2)))
    print(f"Henrique Alexandre{km_distance}")