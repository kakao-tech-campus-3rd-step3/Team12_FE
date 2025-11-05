from switchyard.lib.userlib import *

MAX_SIZE = 2 

def main(net):
    my_interfaces = net.interfaces()
    mymacs = [intf.ethaddr for intf in my_interfaces]
    
    table = {}

    while True:
        try:
            timestamp, input_port, packet = net.recv_packet()
        except NoPackets:
            continue
        except Shutdown:
            return

        log_info("In {} received packet {} on {}".format(net.name, packet, input_port))
        
        src_mac = packet[0].src
        
        if src_mac in table:
            port_info, volume_info = table[src_mac]
            
            if input_port == port_info:
                log_info(f"Src {src_mac} already learned on {input_port}. Volume preserved.")
            else:
                
                log_warn(f"Move detected: {src_mac} moved from {port_info} to {input_port}. Updating port only.")
                table[src_mac] = (input_port, volume_info) 
        else:
            if len(table) >= MAX_SIZE:   
                _rm_LV_entry(table)
            log_info(f"Learning: {src_mac} added via {input_port} with volume 0.")
            table[src_mac] = (input_port, 0)

        dst_mac = packet[0].dst
        if dst_mac in mymacs:
            log_info("Packet intended for me. Dropping.")
            continue
        else:
            if dst_mac in table:
                output_port, current_volume = table[dst_mac]
                new_volume = current_volume + 1
                table[dst_mac] = (output_port, new_volume) 
                
                log_info(f"Forwarding: Destination {dst_mac} found. Volume updated to {new_volume}. Sending out {output_port}.")
                net.send_packet(output_port, packet)
            else:
                log_info(f"Flooding: Destination {dst_mac} not found in table. Flooding packet.")
                for intf in my_interfaces:
                    if input_port != intf.name:
                        log_info("Flooding packet {} to {}".format(packet, intf.name))
                        net.send_packet(intf.name, packet)

    net.shutdown()

def _rm_LV_entry(table):
    lru_mac = None
    lowest_volume = float('inf') 
    
    for mac, (port, volume) in list(table.items()):
        if volume < lowest_volume:
            lowest_volume = volume
            lru_mac = mac

    if lru_mac:
        del table[lru_mac]
        log_warn(f"LTV Policy: Table full, removed entry for {lru_mac} with lowest volume ({lowest_volume}).")
