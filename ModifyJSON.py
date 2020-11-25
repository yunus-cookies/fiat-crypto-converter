import json
import os
import sys

def write_json(filename):
	data = modify_json(filename)
	os.remove(filename)
	with open(filename, 'w') as f:	
		json.dump(data, f, indent=4)

def modify_json(filename):
	with open(filename) as json_file:
		data = json.load(json_file)
		for key in data:
			newValue = data[key] + " " + "(" + key + ")"
			data[key] = newValue
	return data

if (len(sys.argv) != 2):
	print("Wrong number of arguments.. Try: Python pyFilename filename")
else:
	write_json(str(sys.argv[1]))
